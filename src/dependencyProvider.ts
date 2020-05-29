import * as vscode from 'vscode';
import * as path from 'path';
import * as moment from 'moment';
import * as faker from 'faker';

export class CommentedCodeDependencyProvider implements
  vscode.TreeDataProvider<CommentedCodeSnippet> {
  private _onDidChangeTreeData:
    vscode.EventEmitter<CommentedCodeSnippet | undefined> =
    new vscode.EventEmitter<CommentedCodeSnippet | undefined>();

  readonly onDidChangeTreeData: vscode.Event<CommentedCodeSnippet | undefined> =
    this._onDidChangeTreeData.event;

  constructor() { }

  getTreeItem(element: CommentedCodeSnippet): vscode.TreeItem {
    return element;
  }

  getChildren(element?: CommentedCodeSnippet):
    Thenable<CommentedCodeSnippet[]> {
    if (element) {
      console.log(element.label);
      return Promise.resolve(
          this.getCodeSnippets(),
      );
    } else {
      return Promise.resolve(
          this.getCodeSnippets(),
      );
    }
  }
  async getTitle(): Promise<string> {
    let title = await vscode.window.showInputBox({
      placeHolder: 'Enter the name of the file that the snippet belongs to',
    });
    title = title === undefined ? title = '' : title;
    return title;
  }

  async getDescription(): Promise<string> {
    let description = await vscode.window.showInputBox({
      placeHolder: `Enter a short description for why
       the snippet is being commented`,
    });
    description = description === undefined ? description = '' : description;
    return description;
  }

  async getReminderDate(): Promise<Date> {
    const date = await vscode.window.showInputBox({
      value: '',
      placeHolder: `Enter reminder date in format DD/MM/YYYY`,
      validateInput: (date) => {
        let validationErr = null;
        if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
          validationErr = 'Incorrect date format';
        }
        return validationErr;
      },
    });
    return moment(date).toDate();
  }

  getSelectedSnippet(): string {
    const editor = vscode.window.activeTextEditor;
    let selectiontext = '';
    if (editor) {
      let selection = editor.selection;
      const _selection = new vscode.Selection(
          new vscode.Position(0, 0), new vscode.Position(0, 0));
      selection = selection === undefined ? selection = _selection: selection;
      const document = editor.document;
      selectiontext = document.getText(selection);
    }
    return selectiontext;
  }

  createCodeSnippet( title: string,
      description: string,
      snippet: string,
      reminderDate: Date):CommentedCodeSnippet {
    const commentedCodeSnippet = new CommentedCodeSnippet(
        title,
        description,
        snippet,
        reminderDate,
        vscode.TreeItemCollapsibleState.Collapsed,
    );

    commentedCodeSnippet.save();
    return commentedCodeSnippet;
  }


  private getCodeSnippets(): CommentedCodeSnippet[] {
    const snippet1 = new CommentedCodeSnippet(
        faker.lorem.sentence(),
        faker.lorem.sentences(),
        faker.random.words(),
        new Date(),
        vscode.TreeItemCollapsibleState.Collapsed,
    );
    const snippet2 = new CommentedCodeSnippet(
        faker.lorem.sentence(),
        faker.lorem.sentences(),
        faker.random.words(),
        new Date(),
        vscode.TreeItemCollapsibleState.Collapsed,
    );
    return [snippet1, snippet2];
  }
}

class CommentedCodeSnippet extends vscode.TreeItem {
  constructor(
    private title: string,
    private _description: string,
    private snippet: string,
    private reminderDate: Date,
    public collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(title, collapsibleState);
  }

  get tooltip(): string {
    return `${this.title} - 
    ${moment(this.reminderDate).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  get description(): string {
    return this._description;
  }

  private updateSnippetWithMetaData() {
    const updatedSnippet = `
        /*
        ** Description: ${this.description}
        I would like to update this by ${moment(this.reminderDate).format('MMMM Do YYYY')}
        */

        ${this.snippet}
      `;
    return updatedSnippet;
  }

  save() {
    const edit = new vscode.WorkspaceEdit();
    const txtUri = vscode.Uri.file(
        path.join(__filename, '..', '..', 'snippets', `${this.title}`),
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
