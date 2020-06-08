export class Snippet {
  title: string;
  description: string;
  code: string;
  reminderDate: Date;
  constructor(title: string, description: string, code: string,
      reminderDate: Date) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.reminderDate = reminderDate;
  }
};
