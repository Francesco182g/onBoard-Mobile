import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { AuthenticationService } from '../services/authentication.service';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
    { path: '', loadChildren: '../tabs/tabs.module#TabsPageModule' },
  { path: 'tabs', loadChildren: '../tab1/tab1.module#Tab1PageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {


}
