import {Snippet} from '../../entities/Snippet';
// eslint-disable-next-line no-unused-vars
import {SnippetRepository} from '../contracts/SnippetRepository';
// eslint-disable-next-line no-unused-vars
import {SnippetInput} from '../../entities/snippetInput';
/**
 * creates and persists a snippet
 * @param {SnippetRepository} snippetRepository repository
 * @return {Promise<Snippet>} The sum of the two numbers.
 */
export class AddSnippet {
    private SnippetRepository:SnippetRepository;

    // eslint-disable-next-line require-jsdoc
    constructor(SnippetRepository:SnippetRepository) {
      this.SnippetRepository = SnippetRepository;
    }
    /**
     * Add new snippet
     * @param {string} title
     * @param {string} description
     * @param {string} code
     * @param {Date} reminderDate
     * @return {Promise<Snippet>}
     */
    async execute(title: string, description: string, code: string,
        reminderDate: Date): Promise<Snippet> {
      const snippetInput: SnippetInput = {
        title: title,
        description: description,
        code: code,
        reminderDate: reminderDate,
      };
      const snippet = new Snippet(snippetInput);
      const operation = await this.SnippetRepository.add(snippet);
      return new Promise((resolve, reject) => {
        operation instanceof Snippet ? resolve(operation): reject(operation);
      });
    }
}
