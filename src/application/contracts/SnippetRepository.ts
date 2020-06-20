// eslint-disable-next-line no-unused-vars
import {Snippet} from '../../entities/Snippet';

export abstract class SnippetRepository {
  abstract async add(snippet: Snippet): Promise<Snippet>;
  abstract async getAll(): Promise<Snippet[]>;
}
