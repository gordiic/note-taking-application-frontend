import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  getAllPagination(page: number, size: number): Observable<any> {
    return this.getHttpClient().get<any>(this.getUrl() + '/pagination', { params: { page: page.toString(), size: size.toString() } });
  }

  update(T: BaseModel, parentId?: number) {
    return this.getHttpClient().put<T>(this.getUrl(parentId) + '/' + T.id, T);
  }

  delete(id: string, parentId?: number) {
    return this.getHttpClient().delete(this.getUrl(parentId) + '/' + id);
  }

  search(searchTerm: string): Observable<any> {
    const headers = new HttpHeaders({
    });
    return this.getHttpClient().get(this.getUrl() + "/search", { params: { term: searchTerm }, headers });
  }

  abstract getUrl(parentId?: number): string;

  abstract getHttpClient(): HttpClient;

}
