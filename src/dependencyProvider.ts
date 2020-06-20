import * as vscode from 'vscode';
import * as path from 'path';
import * as moment from 'moment';
import {AddSnippet} from './application/use_cases/addSnippet';
// eslint-disable-next-line no-unused-vars
import {SnippetRepository} from
  './application/contracts/SnippetRepository';
// eslint-disable-next-line no-unused-vars
import {Snippet} from './entities/Snippet';


export class CommentedCodeDependencyProvider implements
  vscode.TreeDataProvider<vscode.TreeItem> {
  // eslint-disable-next-line max-len
  private _onDidChangeTreeData:
    vscode.EventEmitter<vscode.TreeItem | undefined> =
      new vscode.EventEmitter<vscode.TreeItem | undefined>();
  private snippetRepository: SnippetRepository;
  readonly onDidChangeTreeData:
    // eslint-disable-next-line max-len
    vscode.Event<vscode.TreeItem | undefined> = this._onDidChangeTreeData.event;

  constructor(snippetRepository: SnippetRepository) {
    this.snippetRepository = snippetRepository;
  }

  getTreeItem(element: CommentedCodeSnippetTreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: CommentedCodeSnippetTreeItem):
    Promise<CommentedCodeSnippetTreeItem[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(
          this.getCodeSnippetTreeItems(),
      );
    }
  }

  async createCodeSnippet( title: string,
      description: string,
      code: string,
      reminderDate: Date):Promise<CommentedCodeSnippetTreeItem> {
    const addSnippetCommand = new AddSnippet(this.snippetRepository);
    const snippet = await addSnippetCommand.execute(
        title, description, code, reminderDate,
    );
    const commentedCodeSnippetTreeItem = new CommentedCodeSnippetTreeItem(
        snippet,
        vscode.TreeItemCollapsibleState.Collapsed,
    );

    commentedCodeSnippetTreeItem.save();
    this._onDidChangeTreeData.fire(commentedCodeSnippetTreeItem);
    return commentedCodeSnippetTreeItem;
  }


  private async getCodeSnippetTreeItems():
  Promise<CommentedCodeSnippetTreeItem[]> {
    const snippets = await this.snippetRepository.getAll();
    const codeSnippetTreeItems = snippets.map(
        (snippet) => new CommentedCodeSnippetTreeItem(
            snippet,
            vscode.TreeItemCollapsibleState.Collapsed,
        ),
    );
    return new Promise((resolve, _reject) => {
      resolve(codeSnippetTreeItems);
    });
  }
}

class CommentedCodeSnippetTreeItem extends vscode.TreeItem {
  snippet: Snippet
  constructor(
      snippet: Snippet,
      public collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(snippet.title, collapsibleState);
    this.snippet = snippet;
  }

  get tooltip(): string {
    return `${this.snippet.title} - 
    ${moment(this.snippet.reminderDate).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  get description(): string {
    return this.snippet.description;
  }

  private updateSnippetWithMetaData() {
    const updatedSnippet = `
      /*
      ** Description: ${this.description}
      I would like to update this by ${moment(this.snippet.reminderDate)
      .format('MMMM Do YYYY')}
      */

        ${this.snippet}
      `;
    return updatedSnippet;
  }

  save() {
    const edit = new vscode.WorkspaceEdit();
    const txtUri = vscode.Uri.file(
        path.join(__filename, '..', '..', 'snippets', `${this.snippet.title}`),
    );
    edit.createFile(
        txtUri,
        {ignoreIfExists: true},
    );

    edit.replace(
        txtUri,
        new vscode.Range(0, 0, 0, 0),
        this.updateSnippetWithMetaData(),
    );
    vscode.workspace.applyEdit(edit);
  }

  iconPath = {
    dark: path.join(__filename, '..', '..', 'resources', 'light',
        'dependency.svg'),
    light: path.join(__filename, '..', '..', 'resources', 'dark',
        'dependency.svg'),
  };
  contextValue = 'dependency';
}
