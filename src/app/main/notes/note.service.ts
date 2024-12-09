import {BaseService} from '../../shared/services/base.service';
import {Injectable} from '@angular/core';
import {Note} from '../../shared/models/note.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({  providedIn: 'root' })
export class NoteService extends BaseService<Note> {

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    super();
  }

  getHttpClient(): HttpClient {
    return this.httpClient;
  }

  getUrl(parentId?: number | undefined): string {
    return environment.API_URL + '/notes';
  }

  public createNoteForm(note?: Note): FormGroup {
    return this.fb.group({
      id: [null, []],
      createdAt: [null, []],
      updatedAt: [null, []],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

}
