// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "merge-logs" is now active!');

  let show = vscode.commands.registerCommand('merge-logs.showMergeLogs', () => {
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
    panel.webview.html = `<html><body>test merge logs</body></html>`;
  });

  context.subscriptions.push(show);
}

// this method is called when your extension is deactivated
export function deactivate() {}
