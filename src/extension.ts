// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {CommentedCodeDependencyProvider} from './dependencyProvider';

/**
 * @param {vscode.ExtensionContext } context
 */
export function activate(context: vscode.ExtensionContext) {
  const commentedCodeDependencyProvider = new CommentedCodeDependencyProvider();
  vscode.window.registerTreeDataProvider('commentedCodeKeeperView',
      commentedCodeDependencyProvider);
  vscode.commands.registerCommand(
      'commentedCodeKeeperView.addEntry',
      async () => {
        const snippet = commentedCodeDependencyProvider.getSelectedSnippet();
        const title = await commentedCodeDependencyProvider.getTitle();
        const description = await commentedCodeDependencyProvider
            .getDescription();
        const date = await commentedCodeDependencyProvider.getReminderDate();

        console.info(`Code Snippet: ${snippet}`);
        console.info(`Title: ${title}`);
        console.info(`Description: ${description}`);
        console.info(`Date: ${date}`);

        commentedCodeDependencyProvider.createCodeSnippet(
            title,
            description,
            snippet,
            date,
        );
      },
  );

  vscode.commands.registerCommand(
      'commentedCodeKeeperView.deleteEntry',
      () => {
        vscode.window.showInformationMessage(
            `Successfully called deleteEntry.`);
      },
  );

  vscode.commands.registerCommand(
      'commentedCodeKeeperView.editEntry',
      () => {
        vscode.window.showInformationMessage(`Successfully called editEntry.`);
      },
  );

  vscode.window.createTreeView('commentedCodeKeeperView', {
    treeDataProvider: commentedCodeDependencyProvider,
  });
  const disposable = vscode.commands.registerCommand(
      'commentedCodeKeeperView.commentCode', () => {
        vscode.window.showInformationMessage('Hello World!');
      });

  context.subscriptions.push(disposable);
}

/** this method is called when your extension is deactivated */
export function deactivate() {}
