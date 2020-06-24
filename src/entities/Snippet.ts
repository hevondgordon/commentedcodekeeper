
// eslint-disable-next-line no-unused-vars
import {SnippetInput} from './snippetInput';
/**
 * Snippet entity
 */
export class Snippet {
  title: string;
  description: string;
  code: string;
  reminderDate: Date;
  // eslint-disable-next-line require-jsdoc
  constructor(snippetInput: SnippetInput) {
    this.title = snippetInput.title;
    this.description = snippetInput.description;
    this.code = snippetInput.code;
    this.reminderDate = snippetInput.reminderDate;
  }
};
