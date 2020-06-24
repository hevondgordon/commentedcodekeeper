// eslint-disable-next-line no-unused-vars
import {Snippet} from '../../entities/Snippet';
// eslint-disable-next-line no-unused-vars
import {SnippetRepository} from '../contracts/SnippetRepository';

/**
 * lists all available snippets
 * @param {SnippetRepository} snippetRepository repository
 * @return {Promise<Snippet>[]} A list of snippets
 */
export class ListSnippet {
    private SnippetRepository:SnippetRepository;
    // eslint-disable-next-line require-jsdoc
    constructor(SnippetRepository:SnippetRepository) {
      this.SnippetRepository = SnippetRepository;
    }

    /**
     * lists all snippets
     * @return {Promise<Snippet[]>}
     */
    async execute(): Promise<Snippet[]> {
      const snippets = this.SnippetRepository.getAll();
      return new Promise((resolve, _reject) => {
        resolve(snippets);
      });
    }
}
