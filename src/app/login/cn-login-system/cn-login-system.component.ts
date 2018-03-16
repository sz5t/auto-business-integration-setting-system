import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Broadcaster} from '../../broadcast/broadcaster';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientStorageService} from '../../services/client-storage.service';
import {OnlineUser} from '../cn-login/online-user.model';
import {Configuration} from '../../framework/configuration';
import {environment} from '../../../environments/environment';
import {MemoryService} from '../../services/memory.service';


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
              private broadcast: Broadcaster,
              private memoryService: MemoryService) {
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
    // this.entryProject1();
    this.apiService.doPost2(environment.onlineUser_resource, this.onlineUser)
      .toPromise()
      .then(response => {
        this.onlineUser = {...response.Data};
        if (response.Data.Online) {
          // console.log(this.memoryService.getHeroes('menuShared').then(heroes => console.log(heroes)));
          this.entryProject();
        }else {
          this.errorMessage = this.onlineUser.Message;
        }
      })
      .catch((error) => {
        this.onlineUser = null;
      });
  }

  entryProject1() {
    // this.apiService.doGetLoadJson(environment.resource_menu)
    //   .toPromise()
    //   .then(menussss => {
    //      this.apiService.doGetLoadJson(environment.configMenu_response)
    //     .toPromise()
    //     .then(aa => {
    //       let menusAry = new Array();
    //       for(let i in aa){ menusAry.push(aa[i]); }
    //       for(let j in menussss){ menusAry.push(menussss[j]); }
    //       this.clientStorage.setCookies('appUser', 'NIMING');
    //       this.clientStorage.setSessionStorage('appmenu', menusAry);
    //     }).then( arg => {
    //        this.router.navigate(['/app', this.router.url.substring(1)]).then(() => {
    //          this.broadcast.broadcast('loadConfig', 'start');
    //          this.broadcast.broadcast('loadConfig', 'processing');
    //          this.broadcast.broadcast('loadConfig', 'end');
    //        })
    //      })
    //   });
    this.memoryService.getData('menuShared').then( netMenu => {
      this.memoryService.getData('menus').then(meShared => {
        this.clientStorage.setCookies('appUser', 'NIMING');
        this.clientStorage.setSessionStorage('appmenu', meShared.concat(netMenu));
      }).then( arg => {
        this.router.navigate(['/app', this.router.url.substring(1)]).then(() => {
                   this.broadcast.broadcast('loadConfig', 'start');
                   this.broadcast.broadcast('loadConfig', 'processing');
                   this.broadcast.broadcast('loadConfig', 'end');
                 })
        }
      );
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
              '&ApplyId=' + CommonCode.Data[0].Id + '&PlatCustomerId=' + CommonCode.Data[0].PlatCustomerId).toPromise()
             .then(request => {return JSON.parse(request.Data[0].ConfigData);});
          }else{
            return this.memoryService.getData('menus');
          }
        })
        .then(netMenu => {
          return this.memoryService.getData('menuShared').then(meShared => {return meShared.concat(netMenu);});
        })
        .then((menuList) => {
          this.clientStorage.setSessionStorage('appmenu', menuList);
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

