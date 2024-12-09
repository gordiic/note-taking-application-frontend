import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseModel} from '../models/base.model';

export abstract class BaseService<T> {
  constructor() {}

  create(T: BaseModel, parentId?: number) {
    return this.getHttpClient().post<T>(this.getUrl(parentId), T);
  }

  get(id: string, parentId?: number): Observable<T> {
    return this.getHttpClient().get<T>(this.getUrl(parentId) + '/' + id);
  }

  getAll(): Observable<Array<T>> {
    return this.getHttpClient().get<Array<T>>(this.getUrl());
  }

  update(T: BaseModel, parentId?: number) {
    return this.getHttpClient().put<T>(this.getUrl(parentId) + '/' + T.id, T);
  }

  delete(id: string, parentId?: number) {
    return this.getHttpClient().delete(this.getUrl(parentId) + '/' + id);
  }

  abstract getUrl(parentId?: number): string;

  abstract getHttpClient(): HttpClient;

}
