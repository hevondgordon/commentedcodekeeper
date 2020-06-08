
import {SnippetRepository} from
  '../../../application/contracts/SnippetRepository';
// eslint-disable-next-line no-unused-vars
import {Snippet} from '../../../entities/Snippet';
import {InMemoryDatabaseService} from './inMemoryDatabaseService';

export class InMemorySnippetRepository extends SnippetRepository {
  InMemoryDatabaseService: InMemoryDatabaseService
  snippets: Snippet[];
  constructor() {
    super();
    this.InMemoryDatabaseService = new InMemoryDatabaseService();
    this.snippets = [
      new Snippet(
          'title', 'description', 'code', new Date(),
      ),
    ];
  }

  async add(snippet: Snippet): Promise<Snippet> {
    this.snippets.push(snippet);
    return new Promise((resolve, reject) => {
      resolve(snippet);
    });
  }

  async getAll(): Promise<Snippet[]> {
    return new Promise((resolve, _reject) => {
      resolve(this.snippets);
    });
  }
}
