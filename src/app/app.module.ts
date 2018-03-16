import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CnRouter} from './routes/cn.router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiService} from './services/api.service';
import {Broadcaster} from './broadcast/broadcaster';
import {ConfigService} from './services/config.service';
import { HttpModule} from '@angular/http';
import { InMemoryDataService } from './services/in-memory-data.service';
import {ApplicationsModule} from './application/applications.module';
import {WebStorageModule} from 'ngx-store';
import {ClientStorageService} from './services/client-storage.service';
import {TokenInterceptor} from './services/interceptor/token.interceptor';
import {LoginAuthService} from './services/login-auth.service';
import {MockDataService} from './services/mock-data.service';
import {SubjectMessageService} from './services/subject-message.service';
import { NotPageComponent } from './not-page/not-page.component';
import {FixComponetLifehookService} from './services/fix-componet-lifehook.service';
import {MemoryService} from './services/memory.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    NotPageComponent,
  ],
  imports: [
    BrowserModule,
    CnRouter,
    HttpClientModule,
    ApplicationsModule,
    WebStorageModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    ApiService,
    ConfigService,
    ClientStorageService,
    LoginAuthService,
    MockDataService,
    SubjectMessageService,
    Broadcaster,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    FixComponetLifehookService,
    MemoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
