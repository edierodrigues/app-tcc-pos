import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'

@Injectable()
export class AuthProvider {

  private url: string = 'https://tcc-edvaldo.herokuapp.com/api';

  constructor(
    public http: Http,
    public storage: Storage
  ) {
  }

  login(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({headers: headers});
    return new Promise ((resolve, reject) => {
      this.http.post(this.url + '/auth/login', credentials, options)
      .map(res => {return res.json()})
      .toPromise()
      .then(res => {
        this.storage.set('token', res.access_token);
        resolve();
      },reject);
    });
  }

  userIsLogged() {
    return this.storage.get('token').then(function (val) {
      return val || false;
    });
  }

  logout() {
    let http = this.http;
    let url  = this.url;
    let storage  = this.storage;
    return storage.get('token').then(function (token) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer '+ token);

      let options = new RequestOptions({headers: headers});
      return http.post(url + '/auth/logout', {}, options)
      .map(res => {return res.json()})
      .toPromise()
      .then(res => {
        storage.remove('token');
        return true;
      });
    });
  }
}
