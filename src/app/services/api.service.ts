import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Configuration} from '../framework/configuration';
import {Observable} from 'rxjs/Observable';
import {ClientStorageService} from './client-storage.service';
@Injectable()
export class ApiService {
  headers = new HttpHeaders();
  _customerId;
  array$: Observable<any[]>;
  object$: Observable<any>;
  constructor(
    private httpClient: HttpClient,
    private clientStorage: ClientStorageService) {
  }


  setHeaders() {
    const userToken = this.clientStorage.getCookies('onlineUser');
    return new HttpHeaders()
      .set('Credential', userToken['Token'] ? userToken['Token'] : '')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Cache-Control', 'no-cache');
  }

  set customerId(id) {
    this._customerId = id;
  }

  doGetLoadJson<T>(url) {
    return this.httpClient.request<T>(
      'GET',
      url,
      {
        responseType: 'json'
      }
    );
  }

  get customerId() {
    if (this._customerId) {
      return this._customerId;
    } else {
      return this.clientStorage.getCookies('customerId');
    }
  }

  getCustomerConfig(url) {
    return (Configuration.web_api + url).replace('{customerId}', this.customerId);
  }

  doGetConfig(configUrl) {
    this.array$ =  this.httpClient.request(
      'GET',
      configUrl,
      {
        responseType: 'json',
        headers: this.setHeaders()
      }
    );
    return this.array$;
  }

  doList(url, params?, data?) {
    return this.httpClient.request<any[]>(
      'GET',
      this.getCustomerConfig(url),
      {
        responseType: 'json',
        params: this.buildParameters(params),
        headers: this.setHeaders()
      }
    );
  }

  doListWithoutAuth(url, params?, data?) {
    return this.httpClient.request<any[]>(
      'GET',
      Configuration.mock_api + url,
      {
        responseType: 'json',
        params: this.buildParameters(params)
      }
    );
  }

  doQuery(url, params?, data?) {
    return this.httpClient.request(
      'GET',
      this.getCustomerConfig(url),
      {
        responseType: 'json',
        params: this.buildParameters(params),
        headers: this.setHeaders()
      }
    );
  }

  doGet(url, params?, data?) {
    return this.httpClient.request(
      'GET',
      this.getCustomerConfig(url),
      {
        responseType: 'json',
        params: this.buildParameters(params),
        headers: this.setHeaders()
      }
    );
  }

  doGet2<T>(url, params?, data?) {
    return this.httpClient.request<T>(
      'GET',
      this.getCustomerConfig(url),
      {
        responseType: 'json',
        params: this.buildParameters(params),
        headers: this.setHeaders()
      }
    );
  }

  doPut(url, params?, data?) {
    return this.httpClient.request(
      'PUT',
      this.getCustomerConfig(url),
      {
        body: data,
        headers: this.setHeaders(),
        params: this.buildParameters(params)
      }
    );
  }

  doDelete(url, params?, data?) {
    return this.httpClient.request(
      'DELETE',
      this.getCustomerConfig(url),
      {
        headers: this.setHeaders(),
        params: this.buildParameters(params)
      }
    );
  }

  doPost(url, param, data) {
    return this.httpClient.request<any>(
      'POST',
      this.getCustomerConfig(url),
      {
        body: data,
        headers: this.setHeaders()
      }
    );
  }

  doPost2(url, data?) {
    const urls = this.getCustomerConfig(url);
    return this.httpClient.request<any>(
      'POST',
      urls,
      {
        body: data
      }
    );
  }



  doProc(url, params?, data?) {
    return this.httpClient.request(
      'GET',
      this.getCustomerConfig(url),
      {
        responseType: 'json',
        params: this.buildParameters(params),
        headers: this.setHeaders()
      }
    );
  }

  doGetWithProgress(url, params?) {
    const req = new HttpRequest(
      'GET',
      this.getCustomerConfig(url),
      {headers: this.setHeaders(), params: this.buildParameters(params)},
      {reportProgress: true}
    );
    return this.httpClient.request(req);
  }

  doPostWithProgress<T>(url, data) {
    const req = new HttpRequest(
      'POST',
      this.getCustomerConfig(url),
      {body: data},
      {reportProgress: true}
    );
    return this.httpClient.request<T>(req);
  }

  private buildParameters(params): HttpParams {
    let str = '';
    if (params) {
      if(Array.isArray(params)) {
        str = params.join('&');
        return new HttpParams({fromString: str});
      }else {
        for (const p in params) {
          if (params.hasOwnProperty(p)) {
            const s = [];
            s[0] = p;
            s[1] = '=';
            s[2] = params[p];
            s[3] = '&';
            str += s.join('');
          }
        }
        return new HttpParams({fromString: str.substring(0, str.length - 1)});
      }

    }
  }
}
