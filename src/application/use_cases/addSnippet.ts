import {Snippet} from '../../entities/Snippet';
/**
 * creates and persists a snippet
 * @param {SnippetRepository} snippetRepository repository
 * @return {Promise<Snippet>} The sum of the two numbers.
 */
export class AddSnippet {
    private SnippetRepository:any;
    constructor(SnippetRepository:any) {
      this.SnippetRepository = SnippetRepository;
    }

    async execute(title: string, description: string, code: string,
        reminderDate: Date): Promise<Snippet> {
      const snippet = new Snippet(title, description, code, reminderDate);
      const operation = await this.SnippetRepository.add(snippet);
      return new Promise((resolve, reject) => {
        operation instanceof Snippet ? resolve(snippet): reject(operation);
      });
    }
}
