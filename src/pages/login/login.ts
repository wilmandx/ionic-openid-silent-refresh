import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public oauthService: OAuthService) {
    console.log('LoginPage constructor ');
    
  }

  async ionViewDidLoad() {
    console.log('LoginPage ionViewDidLoad');
    
  }

  redirectLogin() {
    console.log('Test');
    
    this.oauthService.initImplicitFlow();
  }

}
