// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Webview, Uri } from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const getRelativeResource = (webview: Webview, relativePath: string) => {
    // @ts-ignore
    return webview.asWebviewUri(
      Uri.file(path.join(context.extensionPath, relativePath))
    );
  };

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
      panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MergeLogs</title>
  <script type="module" src="${getRelativeResource(
        panel.webview,
        './client/dist/_assets/index.fa698dad.js'
      )}"></script>
  <link rel="stylesheet" href="${getRelativeResource(
        panel.webview,
        './client/dist/_assets/style.4f14ca88.css'
      )}">
</head>
<body>
  <div id="app"></div>
</body>
</html>`;
    }
  );

  context.subscriptions.push(showMergeLogs);
}

// this method is called when your extension is deactivated
export function deactivate() {}
