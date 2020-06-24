// eslint-disable-next-line no-unused-vars
import {Snippet} from '../../entities/Snippet';
import {SnippetInput} from '../../entities/snippetInput';

/**
 * Abstract snippet repository class
 * that should have a concrete implementation
 * in an external layer
 */
export abstract class SnippetRepository {
  abstract async add(snippet: Snippet): Promise<Snippet>;
  abstract async getAll(): Promise<Snippet[]>;
  inflateSnippets(snippets: SnippetInput[]):Promise<Snippet[]> {
    const inflatedSnippets: Snippet[] = [];
    for (const snippet of snippets) {
      const snippetInput: SnippetInput = snippet;
      const _snippet = new Snippet(snippetInput);
      inflatedSnippets.push(_snippet);
    }
    return Promise.resolve(inflatedSnippets);
  }
}
