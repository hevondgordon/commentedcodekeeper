// eslint-disable-next-line no-unused-vars
import {Snippet} from '../../entities/Snippet';

export class SnippetRepository {
  add(_snippet: Snippet): Promise<Snippet> {
    return new Promise((_resolve, reject) => {
      reject(new Error('not implemented'));
    });
  }
  getAll(): Promise<Snippet[]> {
    return new Promise((_resolve, reject) => {
      reject(new Error('not implemented'));
    });
  }
}
