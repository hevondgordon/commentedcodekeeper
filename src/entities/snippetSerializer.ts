// eslint-disable-next-line no-unused-vars
import {Snippet} from './Snippet';
// eslint-disable-next-line no-unused-vars
import {SnippetOutput} from './snippetOutput';

/**
 * Serializer class that converts Snippet to JSON object
 */
export class SnippetSerializer {
    snippet: Snippet;
    // eslint-disable-next-line require-jsdoc
    constructor(snippet: Snippet) {
      this.snippet = snippet;
    }

    /**
     * Ensures that the snippet that was
     * passed to the serializer is able to be
     * serialized.
     *  @return {Boolean} whether or not the snippet is valid
     */
    isValid(): Boolean {
      if (this.snippet.code !== undefined && this.snippet.code !== '' &&
          this.snippet.title !== undefined && this.snippet.title !== '' &&
          this.snippet.description !== undefined &&
          this.snippet.description !== '' &&
          this.snippet.reminderDate !== undefined &&
          this.snippet.reminderDate.getTime() >
          new Date().getTime()
      ) {
        return true;
      }
      return false;
    }

    /**
     * Takes the snippet object that was passed
     * to the serializer class and converts it
     * to a JSON object
     * @return {Object | undefined} whether or not the snippet is valid
     */
    serialize(): SnippetOutput | undefined {
      if (this.isValid()) {
        return {
          'title': this.snippet.title,
          'description': this.snippet.description,
          'code': this.snippet.code,
          'reminderDate': this.snippet.reminderDate.toDateString(),
        };
      }
    }
}
