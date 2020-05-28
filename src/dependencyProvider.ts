import * as vscode from 'vscode';
import * as path from 'path';
import * as moment from 'moment';
import * as faker from 'faker';

export class CommentedCodeDependenciesProvider implements vscode.TreeDataProvider<CommentedCodeSnippet> {
  private _onDidChangeTreeData: vscode.EventEmitter<CommentedCodeSnippet | undefined> =
  new vscode.EventEmitter<CommentedCodeSnippet | undefined>();

  readonly onDidChangeTreeData: vscode.Event<CommentedCodeSnippet | undefined> = 
  this._onDidChangeTreeData.event;

  constructor() { }

  getTreeItem(element: CommentedCodeSnippet): vscode.TreeItem {
    return element;
  }

  getChildren(element?: CommentedCodeSnippet): Thenable<CommentedCodeSnippet[]> {
    if (element) {
      console.log(element.label);
      return Promise.resolve(
        this.getCodeSnippets()
      );
    } else {
      return Promise.resolve(
        []
      );
    }
  }

  private getCodeSnippets(): CommentedCodeSnippet[] {
    const snippet1 = new CommentedCodeSnippet(
      faker.random.words(),
      new Date(),
      vscode.TreeItemCollapsibleState.Collapsed
    )
    const snippet2 = new CommentedCodeSnippet(
      faker.random.words(),
      new Date(),
      vscode.TreeItemCollapsibleState.Collapsed
    )
    return [snippet1, snippet2];
  }
}

class CommentedCodeSnippet extends vscode.TreeItem {
  constructor(
    private snippet: string,
    private reminderDate: Date,
    public collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(snippet, collapsibleState);
  }

  get tooltip(): string {
    return `${moment(this.reminderDate).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  get description(): string {
    return this.snippet;
  }

  iconPath = {
    dark: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    light: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
  };
}
