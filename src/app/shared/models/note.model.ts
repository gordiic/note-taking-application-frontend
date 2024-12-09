import {BaseModel} from './base.model';

export class Note extends BaseModel {
  title : string;
  content : string;

  constructor(id: string, createdAt: string, updatedAt: string, title: string, content: string) {
    super(id, createdAt, updatedAt);
    this.title = title;
    this.content = content;
  }
}
