import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CnLoginComponent} from './cn-login/cn-login.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {path: 'login', component: CnLoginComponent}
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [CnLoginComponent]
})
export class CnLoginModule {
}
