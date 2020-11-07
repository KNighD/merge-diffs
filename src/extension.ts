import * as vscode from 'vscode';
import getHtmlTemp from './getHtmlTemp';
import receiveMessageHandler from './receiveMessageHandler';

export function activate(context: vscode.ExtensionContext) {
  let showMergeDiffs = vscode.commands.registerCommand(
    'merge-diffs.showMergeDiffs',
    () => {
      const panel = vscode.window.createWebviewPanel(
        'testWebview',
        // title
        'MergeDiffs',
        // 显示在编辑器的哪个部位
        vscode.ViewColumn.One,
        {
          // 启用JS，默认禁用
          enableScripts: true,
          // webview被隐藏时保持状态，避免被重置
          retainContextWhenHidden: true,
        }
      );
      // 获取 html 模板
      panel.webview.html = getHtmlTemp(panel.webview, context);
      // 处理 webview 传来的消息
      panel.webview.onDidReceiveMessage(
        async (message) => {
          const res = await receiveMessageHandler(message);
          panel.webview.postMessage(res);
        },
        undefined,
        context.subscriptions
      );
    }
  );

  context.subscriptions.push(showMergeDiffs);
}

// this method is called when your extension is deactivated
export function deactivate() {}
