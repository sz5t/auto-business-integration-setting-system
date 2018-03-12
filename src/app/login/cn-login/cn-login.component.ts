import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Configuration} from '../../framework/configuration';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnlineUser} from './online-user.model';
import {ClientStorageService} from '../../services/client-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Broadcaster} from '../../broadcast/broadcaster';
import {environment} from '../../../environments/environment';
declare let $: any;
declare let MD5: any;
@Component({
  selector: 'cn-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-login.component.html',
  styleUrls: ['./cn-login.component.css']
})

export class CnLoginComponent implements OnInit {
  user: FormGroup;
  onlineUser: OnlineUser;
  errorMessage;
  localConfig;
  customerId;
  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              private clientStorage: ClientStorageService,
              private router: Router,
              private activeRouter: ActivatedRoute,
              private broadcast: Broadcaster) {
    environment.web_api = environment.setHost(this.router.url);
  }

  ngOnInit() {
    this.clearConfig();
    this.user = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    });
  }


  getOnlineUser() {
    this.errorMessage = '';
    this.onlineUser = new OnlineUser();
    this.onlineUser.Identify = this.user.value.userName;
    this.onlineUser.Password = MD5(this.user.value.userPassword);
    $('#sysFlag').val(this.user.value.userName);
    this.apiService.doPost2(Configuration.onlineUser_resource, this.onlineUser)
      .toPromise()
      .then(response => {
        this.onlineUser = {...response.Data};
        if (response.Data.Online) {
          this.entryProject();
        }else {
          this.errorMessage = this.onlineUser.Message;
        }
      })
      .catch((error) => {
        this.onlineUser = null;
      });
  }

  entryProject() {

    this.clientStorage.setCookies('customerId', this.customerId);
    this.clientStorage.setCookies('onlineUser', this.onlineUser);
    this.apiService.doGet2<any>(Configuration.appUser_resource + '/' + this.onlineUser.UserId )
      .toPromise()
      .then(appUser => {
        this.clientStorage.setCookies('appUser', appUser);
        return this.apiService.doGet2<any>(Configuration.commonCode_resource
          + '?Name=' + Configuration.commonCode_code + '&ApplyId=ApplyId' )
          .toPromise(); })
      .then(() => {
        return this.apiService.doGet2<any>(Configuration.appPermission_response).toPromise();
      }).then( () => {
        this.router.navigate(['/app', this.router.url.substring(1)]).then(() => {
          this.broadcast.broadcast('loadConfig', 'start');
          this.broadcast.broadcast('loadConfig', 'processing');
          this.broadcast.broadcast('loadConfig', 'end');
        }).catch(error => {
          console.log(error);
        });
      }
    ); }

  fixModulePermission(permission) {
    let result;
    if (permission === Configuration.AppPermissionType.PERMITTED) {
      result = Configuration.menuNavItemType;
    } else if (permission === Configuration.AppPermissionType.DISABLED) {
      result = '';
    } else if (permission === Configuration.AppPermissionType.INVISIBLE) {
      result = '';
    } else if (permission === Configuration.AppPermissionType.NOT_SET) {
      result = Configuration.menuNavItemType;
    } else {
      result = Configuration.menuNavItemType;
    }
    return result;
  }

  fixFuncPermission(permission) {
    let result;
    if (permission === Configuration.AppPermissionType.PERMITTED) {
      result = true;
    } else if (permission === Configuration.AppPermissionType.DISABLED) {
      result = false;
    } else if (permission === Configuration.AppPermissionType.INVISIBLE) {
      result = false;
    } else if (permission === Configuration.AppPermissionType.NOT_SET) {
      result = true;
    } else {
      result = true;
    }
    return result;
  }

  clearConfig(){
    this.clientStorage.clearCookies();
    this.clientStorage.clearLocalStorage();
    this.clientStorage.clearSessionStorage();
  }
}
