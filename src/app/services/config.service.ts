import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Configuration} from '../framework/configuration';
import {Observable} from 'rxjs/Observable';
import {ProjectConfig} from '../data/modules-resource';
export let AppConfigData: Promise<any[]>;
@Injectable()
export class ConfigService {
  _apiService: ApiService;
  const$: Observable<any[]>;

  constructor(apiService: ApiService) {
    this._apiService = apiService;
  }
  getConfig(){
    this.const$ = this._apiService.doGetConfig(Configuration.config_resource);
    AppConfigData =  this.const$
      .toPromise()
      .then(response => {
        return response;
      });
    return AppConfigData;
  }
  getConfig2(){
    this.const$ = this._apiService.doGetConfig(Configuration.config_resource);
    return this.const$;
  }
  getProjectConfig(){
    return ProjectConfig;
  }

}
