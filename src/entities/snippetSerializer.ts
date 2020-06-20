import {Snippet} from './Snippet';

export class SnippetSerializer {
    snippet: Snippet;
    constructor(snippet: Snippet) {
        this.snippet = snippet;
    }
    
    isValid(): Boolean {
        if (this.snippet.code !== undefined && this.snippet.code !== '' &&
            this.snippet.title !== undefined && this.snippet.title !== '' &&
            this.snippet.description !== undefined && this.snippet.description !== '' &&
            this.snippet.reminderDate !== undefined && this.snippet.reminderDate.getTime() >
            new Date().getTime()
        ) {
            return true;
        }
        return false;
    }

    serialize(): Object | undefined {
        if(this.isValid()) {
            return {
                'title': this.snippet.title,
                'description': this.snippet.description,
                'code': this.snippet.code,
                'reminderDate': this.snippet.reminderDate,
            }
        }
    }
}
