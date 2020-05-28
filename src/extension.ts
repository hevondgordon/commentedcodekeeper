// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {CommentedCodeDependenciesProvider} from './dependencyProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "commentedcodekeeper" is now active!');
	const commentedCodeDependenciesProvider = new CommentedCodeDependenciesProvider();
	vscode.window.registerTreeDataProvider('commentedCodeKeeperView', commentedCodeDependenciesProvider);
	vscode.commands.registerCommand(
		'commentedCodeKeeperView.addEntry',
		() => vscode.window.showInformationMessage(`Successfully called add entry.`));

	vscode.window.createTreeView('commentedCodeKeeperView', {
		treeDataProvider: commentedCodeDependenciesProvider
	});
	let disposable = vscode.commands.registerCommand('commentedCodeKeeperView.commentCode', () => {

		vscode.window.showInformationMessage('Hello World from commentedcodekeeper!');
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
