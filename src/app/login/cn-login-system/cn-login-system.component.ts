import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Broadcaster} from '../../broadcast/broadcaster';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientStorageService} from '../../services/client-storage.service';
import {OnlineUser} from '../cn-login/online-user.model';
import {Configuration} from '../../framework/configuration';
import {environment} from '../../../environments/environment';
declare let $: any;
declare let MD5: any;

@Component({
  selector: 'cn-login',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './cn-login-system.component.html',
  styleUrls: ['./cn-login-system.component.css']
})
export class CnLoginSystemComponent implements OnInit {

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

    environment.web_api = "http://192.168.1.8:8016/f277/Res/";
  }

  ngOnInit() {
      this.clearConfig();
      this.user = this.formBuilder.group({
        userName: ['', [Validators.required]],
        userPassword: ['', [Validators.required]]
      });
    }

  getOnlineUser() {
    this.onlineUser = new OnlineUser();
    // 1. does exist user with identity, validCode, validCodeId
    // 2. make online user with password
    // 3. get appUser and project list
    this.onlineUser.Identify = this.user.value.userName;
    this.onlineUser.Password = MD5(this.user.value.userPassword);
    const identityPromise = this.apiService.doPost2(Configuration.onlineUser_resource, this.onlineUser);
    identityPromise.toPromise()
      .then(response => {
        this.onlineUser = {...response.Data};
        console.log(this.onlineUser);
        if (response.Data.UserId && response.Data.UserId.length > 0) {

          this.entryProject();
        } else {
          this.errorMessage = this.onlineUser.Message;
          console.log(this.errorMessage);
          // show this message
        }
      })
      .catch((error) => {
        this.onlineUser = null;
        console.log(error);
      });
  }

  entryProject() {
    //this.onlineUser.ProjId = "0ac12f70c2a7a44794b57ef0c1c480c2";// 平台维护
    const onlineUserRequest = this.apiService.doPost2(Configuration.onlineUser_resource, this.onlineUser);
    onlineUserRequest
      .toPromise()
      .then(onlineUser => {
        return this.apiService.doPost2(Configuration.onlineUser_resource, onlineUser.Data)
          .toPromise();
      }).then(onlineUser => {
      // console.log('1', onlineUser.Data);
      this.clientStorage.setCookies('customerId', this.customerId);
      this.clientStorage.setCookies('onlineUser', onlineUser.Data);
      return this.apiService.doGet2<any>(Configuration.appUser_resource
        + '/'
        + onlineUser.Data['UserId'])
        .toPromise();
    }).then(appUser => {
      console.log('2', appUser.Data);
      this.clientStorage.setCookies('appUser', appUser);
      return this.apiService.doGet2<any>(Configuration.commonCode_resource
        + '?Name='
        + Configuration.commonCode_code
        + '&ApplyId=ApplyId')
        .toPromise();
    }).then(commonCode => {
      return this.apiService.doGetLoadJson<any>(Configuration.configMenu_response)
        .toPromise();
      /* // console.log('3', commonCode.Data);
       return this.apiService.doGet2<any>(Configuration.appModule_response
         + '?ProjId='
       + this.onlineUser['ProjId']
       + '&ParentId=In(\"\",null)'
       + '&ApplyId=' + commonCode.Data[0]['Id'])
       .toPromise();*/
    }).then(parentAppModuleConfig => {
      // console.log('4', parentAppModuleConfig.Data);
      // this.localConfig = JSON.parse(parentAppModuleConfig.Data[0].ConfigData);
      this.localConfig = parentAppModuleConfig;
      this.clientStorage.setSessionStorage('appModuleConfig', this.localConfig);
      return this.apiService.doGet2<any>(Configuration.appPermission_response).toPromise();
      /*const childModuleConfigsURL =
       Configuration.appModuleTree_response.replace(
       '{parentId}',
       parentAppModuleConfig[0]['Id']);
       return this.apiService.doGet2<any[]>(childModuleConfigsURL
        + '?ProjId='
        + this.onlineUser['ProjId']
       + '&_recursive=true')
       .toPromise();*/
    })
    /*.then(appModuleConfig => {
     const modules = [];
     appModuleConfig.forEach(config => {
     const module = {
     title: config.Name,
     icon: '',
     type: 'nav-item',
     active: false,
     sub: []
     };
     config.Rows.forEach(row => {
     const sub = {
     name: '',
     icon: '',
     title: row.Name,
     description: '',
     router: ''
     };
     module.sub.push(sub);
     });
     modules.push(module);
     });
     // 保存异步配置文件
     this.clientStorage.setSessionStorage('appModuleConfig', modules);
     return this.apiService.doGetConfig(Configuration.config2_resource).toPromise();
     })*/
    /* .then(localConfig => {
     this.localConfig = localConfig;
     return this.apiService.doGet2<any>(Configuration.appPermission_response).toPromise();
     })*/
      .then(appPermission => {
        // console.log('appPermission', appPermission);
        // 加载本地配置文件
        // const modules = {};
        // const funcs = {};
        // const remoteConfig = this.clientStorage.getSessionStorage('appModuleConfig');+this.onlineUser.UserId
        if(appPermission.Data==null)
        {
          this.router.navigate(['/app/System']).then(() => {
            // 持久化本地配置文件
            // this.clientStorage.setSessionStorage('appModuleConfig', localConfig);
            this.broadcast.broadcast('loadConfig', 'start');
            this.broadcast.broadcast('loadConfig', 'processing');
            this.broadcast.broadcast('loadConfig', 'end');
          });
        }
        else {
          appPermission.Data
            .FuncResPermission
            .SubFuncResPermissions[0]
            .SubFuncResPermissions[0]
            .SubFuncResPermissions.forEach(permission => { // 模块权限
            const p = this.fixModulePermission(permission.OpPermissions[0].Permission);
            const navItem = this.localConfig.filter(item => item.title === permission.Name)[0];
            if (navItem) {
              navItem.type = p;
            }
            //console.log(permission.SubFuncResPermissions);
            permission.SubFuncResPermissions.forEach(subFunc => { // 功能权限
              //  console.log(subFunc);
              const d = this.fixFuncPermission(subFunc.OpPermissions[0].Permission);
              if (navItem && navItem.sub) {
                const subItem = navItem.sub.filter(sub => sub.title === subFunc.Name)[0];
                if (subItem) {
                  subItem.display = d;
                }
              }
            });
          });
          this.clientStorage.setSessionStorage('opPermissions', appPermission.Data.OpPermissions);
          this.clientStorage.setSessionStorage('appModuleConfig', this.localConfig);
          return this.apiService.doGet2<any>(Configuration.dataPermission_response).toPromise();
        }}).then(dataPermission => {
      this.clientStorage.setSessionStorage('dataPermissions', dataPermission.Data);
      return this.apiService.doGet2<any>(
        Configuration.appConfig_resource,
        {
          'ProjId': this.onlineUser['ProjId'],
          'ApplyId': Configuration.HJ_AllAppConfig
        })
        .toPromise();
    }).then((appConfigData) => {
      console.log(appConfigData.Data);
      // const appConfig =  JSON.parse(appConfigData.Data[0].Metadata);
      // this.clientStorage.setSessionStorage('appConfig', appConfig);
      this.router.navigate(['/app']).then(() => {
        // 持久化本地配置文件
        // this.clientStorage.setSessionStorage('appModuleConfig', localConfig);
        this.broadcast.broadcast('loadConfig', 'start');
        this.broadcast.broadcast('loadConfig', 'processing');
        this.broadcast.broadcast('loadConfig', 'end');
      }).catch(error => {
        console.log(error);
      });
    });
  }

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

