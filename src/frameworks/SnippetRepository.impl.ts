
import {SnippetRepository} from
  '../application/contracts/SnippetRepository';
// eslint-disable-next-line no-unused-vars
import {Snippet} from '../entities/Snippet';
// eslint-disable-next-line no-unused-vars
import {SnippetInput} from '../entities/snippetInput';
import {SnippetSerializer} from '../entities/snippetSerializer';
import {DatabaseServiceImplementation} from './DatabaseService.impl';
// eslint-disable-next-line no-unused-vars
import axios, {AxiosInstance} from 'axios';
import * as moment from 'moment';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Snippet repository implementation
 */
export class SnippetRepositoryImplementation extends SnippetRepository {
  DatabaseServiceImplementation: DatabaseServiceImplementation
  snippets: Snippet[];
  api: AxiosInstance
  // eslint-disable-next-line require-jsdoc
  constructor() {
    super();
    this.api = axios.create({
      baseURL: 'http://0.0.0.0:8000/api/',
      timeout: 1000,
      headers: {
        'Authorization': `Token ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    this.DatabaseServiceImplementation = new DatabaseServiceImplementation();
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
            console.log(response.data)
            const snippetInput: SnippetInput = {
              title: response.data.title,
              code: response.data.code,
              reminderDate: response.data.reminderDate,
              description: response.data.description,
            };
            resolve(new Snippet(snippetInput));
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
    const snippetInputs: SnippetInput[] = [];
    return new Promise((resolve, reject) => {
      this.api.get('snippets/').then((response) => {
        console.log(response.data.results)
        for (const snippetInput of response.data.results) {
          const _snippetInput: SnippetInput = {
            title: snippetInput.title,
            code: snippetInput.code,
            reminderDate: snippetInput.reminderDate,
            description: snippetInput.description,
          }
          snippetInputs.push(_snippetInput);
        }
        const snippets =  this.inflateSnippets(snippetInputs);
        resolve(snippets);
      }).catch((error) => {
        console.log(error.response);
        reject(error)
      })
    })
    
  }
}
