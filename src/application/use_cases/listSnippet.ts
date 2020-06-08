// eslint-disable-next-line no-unused-vars
import {Snippet} from '../../entities/Snippet';
/**
 * lists all available snipprts
 * @param {SnippetRepository} snippetRepository repository
 * @return {Promise<Snippet>[]} A list of snippets
 */
export class ListSnippet {
    private SnippetRepository:any;
    constructor(SnippetRepository:any) {
      this.SnippetRepository = SnippetRepository;
    }

    async execute(): Promise<Snippet> {
      const snippets = this.SnippetRepository.getAll();
      return new Promise((resolve, _reject) => {
        resolve(snippets);
      });
    }
}
