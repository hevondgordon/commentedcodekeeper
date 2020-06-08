// eslint-disable-next-line no-unused-vars
import {SnippetRepository} from '../contracts/SnippetRepository';
export class DatabaseServices {
  constructor() {
  }

  initDatabase() {
    return new Promise((resolve, reject) => {
      reject(new Error('not implemented'));
    });
  }
}
