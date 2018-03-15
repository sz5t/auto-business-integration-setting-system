import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Broadcaster} from '../../broadcast/broadcaster';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientStorageService} from '../../services/client-storage.service';
import {OnlineUser} from '../cn-login/online-user.model';
import {Configuration} from '../../framework/configuration';
import {environment} from '../../../environments/environment';
import {JSONP_HOME} from '@angular/http/src/backends/browser_jsonp';
declare let $: any;
declare let MD5: any;

@Component({
  selector: 'cn-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-login-system.component.html',
  styleUrls: ['./cn-login-system.component.css']
})
export class CnLoginSystemComponent implements OnInit {

  user: FormGroup;
  onlineUser: OnlineUser;
  errorMessage;
  localConfig;
  customerId;
  platformtitle;
  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              private clientStorage: ClientStorageService,
              private router: Router,
              private activeRouter: ActivatedRoute,
              private broadcast: Broadcaster) {
    if(this.router.url)
      this.platformtitle = environment.setHost(this.router.url);
    $('title').html(this.platformtitle + '平台');
  }

  ngOnInit() {
      this.clearConfig();
      this.user = this.formBuilder.group({
        userName: ['', Validators.required],
        userPassword: ['', Validators.required]
      });
    }

  getOnlineUser() {
    this.errorMessage = '';
    this.onlineUser = new OnlineUser();
    this.onlineUser.Identify = this.user.value.userName;
    this.onlineUser.Password = MD5(this.user.value.userPassword);
    $('#sysFlag').val(this.user.value.userName);
    this.apiService.doPost2(environment.onlineUser_resource, this.onlineUser)
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
      this.apiService.doGet2<any>(environment.appUser_resource + '/' + this.onlineUser.UserId )
        .toPromise()
        .then(appUser => {
            this.clientStorage.setCookies('appUser', appUser);
            return this.apiService.doGet2<any>(environment.commonCode_resource
              + '?Name=' + environment.commonCode_code + '&ApplyId=ApplyId' )
              .toPromise(); })
        .then( CommonCode => {
          if(this.platformtitle === environment.anlyze_system){
           return  this.apiService.doGet2<any>(environment.appModule_resource + '?ProjId=' + this.onlineUser.ProjId +
              '&ApplyId=' + CommonCode.Data[0].Id + '&PlatCustomerId=' + CommonCode.Data[0].PlatCustomerId).toPromise();
          }else{
           return this.apiService.doGetLoadJson(environment.resource_menu).toPromise();
          }
        })
        .then(netMenu => {
            this.apiService.doGetLoadJson(environment.configMenu_response).toPromise().then(locMenu => {
              console.log(locMenu);
              if(this.platformtitle === environment.anlyze_system){
                netMenu = JSON.parse(netMenu.Data[0].ConfigData);
                // console.log(netMenu);
              }
              let menusAry = new Array();
              for(let i in locMenu){ menusAry.push(locMenu[i]); }
              for(let j in netMenu){ menusAry.push(netMenu[j]); }
              // console.log(menusAry);
              this.clientStorage.setSessionStorage('appmenu', menusAry);
            });
          })
        .then(() => {
        return this.apiService.doGet2<any>(Configuration.appPermission_response).toPromise();
      }).then( () => {
        this.router.navigate(['/app', this.router.url.substring(1)]).then(() => {
          this.broadcast.broadcast('loadConfig', 'start');
          this.broadcast.broadcast('loadConfig', 'processing');
          this.broadcast.broadcast('loadConfig', 'end');
        }).catch(error => {
          // console.log(error);
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

  clearConfig() {
    this.clientStorage.clearCookies();
    this.clientStorage.clearLocalStorage();
    this.clientStorage.clearSessionStorage();
    }
}

