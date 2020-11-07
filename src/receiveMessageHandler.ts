import * as vscode from 'vscode'
import asyncExec from './asyncExec'

// 将 shell 打印的内容转成数组
const transform = (stdout: string) =>
  stdout
    .trim()
    .split('\n')
    .map((i) => i.trim().replace(/^\*\s+/, ''))

type WorkSpace = typeof vscode.workspace

const receiveMessageHandler = async (message: string, workspace: WorkSpace) => {
  try {
    // shell 输出的内容
    let stdout
    let resData
    const { type, data } = JSON.parse(message)

    if (!workspace.workspaceFolders) {
      return {
        code: 1,
        data: '获取工程根路径失败！',
      }
    }
    const rootPath = workspace.workspaceFolders[0].uri.path

    switch (type) {
      case 'getBranches':
        stdout = await asyncExec(`cd ${rootPath} && git branch -a`)
        resData = transform(stdout)
        break
      case 'showMergedBranches':
        stdout = await Promise.all(
          data.map((branch: string) =>
            asyncExec(`cd ${rootPath} && git branch -a --merged ${branch}`)
          )
        )
        resData = (stdout as string[]).map((value) => transform(value))
        break
      default:
        break
    }
    return {
      code: 0,
      data: {
        data: resData,
        type,
      },
    }
  } catch (error) {
    return {
      code: 1,
      data: error,
    }
  }
}

export default receiveMessageHandler
