import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { JSEncrypt } from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });
    return this.http.get(`${this.getUrl()}/login`, { headers });
  }

  getUrl(parentId?: number | undefined): string {
    return environment.API_URL;
  }

  setCredentials(username: string, password: string) {
    const hashedPassword = this.encryptPassword(password)

    localStorage.setItem('username', username);
    localStorage.setItem('hashedPassword', hashedPassword ? hashedPassword : '');
  }

  getCredentials(){
    return {
      username:  localStorage.getItem('username'),
      password: this.decryptPassword(localStorage.getItem('hashedPassword')??'')
    }
  }

  encryptPassword(password: string) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.PUBLIC_KEY);
    const a = encrypt.encrypt(password);
    return encrypt.encrypt(password);
  }

  decryptPassword(ciphertext: string) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.PRIVATE_KEY);
    return encrypt.decrypt(ciphertext);
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('hashedPassword') !== null;
  }
}
