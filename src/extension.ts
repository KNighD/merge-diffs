// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import getHtmlTemp from './getHtmlTemp';

export function activate(context: vscode.ExtensionContext) {
  let showMergeLogs = vscode.commands.registerCommand(
    'merge-logs.showMergeLogs',
    () => {
      const panel = vscode.window.createWebviewPanel(
        'testWebview',
        // title
        'MergeLogs',
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
      panel.webview.onDidReceiveMessage(
        (message) => {
          console.log('收到消息：', message);
        },
        undefined,
        context.subscriptions
      );
    }
  );

  context.subscriptions.push(showMergeLogs);
}

// this method is called when your extension is deactivated
export function deactivate() {}
