import * as vscode from 'vscode';
import * as moment from 'moment';
export class Utilities {
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
    return moment(date, 'DD/MM/YYYY').toDate();
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
}
