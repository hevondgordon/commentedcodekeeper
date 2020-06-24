// eslint-disable-next-line no-unused-vars
import {Snippet} from '../../entities/Snippet';

/**
 * Abstract snippet repository class
 * that should have a concrete implementation
 * in an external layer
 */
export abstract class SnippetRepository {
  abstract async add(snippet: Snippet): Promise<Snippet>;
  abstract async getAll(): Promise<Snippet[]>;
}
