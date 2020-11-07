import { Webview, Uri, ExtensionContext } from 'vscode';
import * as path from 'path';

const getRelativeResource = (
  webview: Webview,
  extensionPath: string,
  relativePath: string,
) => {
  // @ts-ignore
  return webview.asWebviewUri(
    Uri.file(path.join(extensionPath, relativePath))
  );
};

// TODO：改写 client 打包脚本
const getHtmlTemp = (
  webview: Webview,
  context: ExtensionContext
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MergeDiffs</title>
  <script type="module" src="${getRelativeResource(
    webview,
    context.extensionPath,
    './out/client/dist/_assets/index.js'
  )}"></script>
  <link rel="stylesheet" href="${getRelativeResource(
    webview,
    context.extensionPath,
    './out/client/dist/_assets/style.css'
  )}">
</head>
<body>
  <div id="app"></div>
</body>
</html>`

export default getHtmlTemp;