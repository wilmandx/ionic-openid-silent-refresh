import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginPage } from '../login/login';
import { ApiProvider } from '../../providers/ApiProvider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public oauthService: OAuthService, public apiProvider: ApiProvider) {

  }
  logout() {
    console.log('logout');
    this.oauthService.logOut();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  callHttpService(){
    console.log('Before call http service ..');
    this.apiProvider.getFilms().subscribe(value=>console.log('Http succes!!'))
  }
  callSilentRefresh(){
    console.log('Before call silent refresh ..');
    this
    .oauthService
    .silentRefresh()
    .then(info => console.debug('refresh ok', info))
    .catch(err => console.error('refresh error', err));
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return (claims as any).name;
  }

  get claims() {
    return this.oauthService.getIdentityClaims();
  }
}
