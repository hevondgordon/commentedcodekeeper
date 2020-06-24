
import {SnippetRepository} from
  '../application/contracts/SnippetRepository';
// eslint-disable-next-line no-unused-vars
import {Snippet} from '../entities/Snippet';
// eslint-disable-next-line no-unused-vars
import {SnippetInput} from '../entities/snippetInput';
import {SnippetSerializer} from '../entities/snippetSerializer';
import {InMemoryDatabaseService} from './inMemoryDatabaseService';
// eslint-disable-next-line no-unused-vars
import axios, {AxiosInstance} from 'axios';
import * as moment from 'moment';

/**
 * Snippet repository implementation
 */
export class InMemorySnippetRepository extends SnippetRepository {
  InMemoryDatabaseService: InMemoryDatabaseService
  snippets: Snippet[];
  api: AxiosInstance
  // eslint-disable-next-line require-jsdoc
  constructor() {
    super();
    this.api = axios.create({
      baseURL: 'http://0.0.0.0:8000/api/',
      timeout: 1000,
      headers: {
        'Authorization': 'Token 9dd472ab5bb23ce634c95330aed258f2f555dbac',
        'Content-Type': 'application/json',
      },
    });
    this.InMemoryDatabaseService = new InMemoryDatabaseService();
    const snippetInput: SnippetInput = {
      title: 'res.data.title',
      code: 'res.data.code',
      reminderDate: new Date(),
      description: 'res.data.description',
    };
    this.snippets = [
      new Snippet(snippetInput),
    ];
  }

  /**
   * Persists a snippet
   * @param {Snippet} snippet snippet to be added
   * @return {Promise<Snippet>}
   */
  async add(snippet: Snippet): Promise<Snippet> {
    this.snippets.push(snippet);
    const snippetData = new SnippetSerializer(snippet).serialize();
    return new Promise((resolve, reject) => {
      if (snippetData) {
        snippetData.reminderDate = moment(snippet.reminderDate).format(
            'YYYY-MM-DD');
        this.api.post('snippets/', snippetData)
            .then((response) => {
              console.log(response);
              resolve(
                  new Snippet(
                      {
                        title: response.data.title, code: response.data.code,
                        reminderDate: response.data.reminderDate,
                        description: response.data.description,
                      },
                  ),
              );
            })
            .catch((error) => {
              console.log(error.response);
              reject(error.response.data);
            });
      }
    });
  }

  /**
   * returns all snippets
   * @return {Promise<Snippet[]>}
   */
  async getAll(): Promise<Snippet[]> {
    return new Promise((resolve, _reject) => {
      resolve(this.snippets);
    });
  }
}
