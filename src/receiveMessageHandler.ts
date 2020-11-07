import asyncExec from './asyncExec'

// 将 shell 打印的内容转成数组
const transform = (stdout: string) =>
  stdout
    .trim()
    .split('\n')
    .map((i) => i.trim().replace(/^\*\s+/, ''))

const receiveMessageHandler = async (message: string) => {
  try {
    // shell 输出的内容
    let stdout
    let resData
    console.log(message)
    const { type, data } = JSON.parse(message)
    switch (type) {
      case 'getBranches':
        stdout = await asyncExec('git branch -a')
        resData = transform(stdout)
        break
      case 'showMergedBranches':
        console.log(data)
        stdout = await Promise.all(
          data.map((branch: string) =>
            asyncExec(`git branch -a --merged ${branch}`)
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
