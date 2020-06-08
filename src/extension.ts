// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {CommentedCodeDependencyProvider} from './dependencyProvider';
import {Utilities} from './utilities';
import {InMemorySnippetRepository} from
  './frameworks/persistence/inMemory/inMemorySnippetRepository';

/**
 * @param {vscode.ExtensionContext } context
 */
export function activate(context: vscode.ExtensionContext) {
  const inMemorySnippetRepository = new InMemorySnippetRepository();
  const commentedCodeDependencyProvider = new CommentedCodeDependencyProvider(
      inMemorySnippetRepository);
  vscode.window.registerTreeDataProvider('commentedCodeKeeperView',
      commentedCodeDependencyProvider);
  vscode.commands.registerCommand(
      'commentedCodeKeeperView.addEntry',
      async () => {
        const utilities = new Utilities();
        const code = utilities.getSelectedSnippet();
        const title = await utilities.getTitle();
        const description = await utilities.getDescription();
        const date = await utilities.getReminderDate();

        await commentedCodeDependencyProvider.createCodeSnippet(
            title,
            description,
            code,
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
