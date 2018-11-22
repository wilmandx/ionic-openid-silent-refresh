import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

const authConfig: AuthConfig = {
 
  // Url of the Identity Provider OKTA TOKEN 1 HOUR
  //issuer: 'https://dev-120928.oktapreview.com',
  // Url authorize server custom with token 5 min 
  issuer: 'https://dev-120928.oktapreview.com/oauth2/default',
 
  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200',

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
 
  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '0oahcep0nuuPVlUTF0h7',
 
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',
  responseType : 'id_token token token_expires',
  timeoutFactor: 0.1,
  showDebugInformation: true,
  silentRefreshIFrameName: 'XXXXXXX-refresh',
  silentRefreshShowIFrame: true
}

// const authConfig: AuthConfig = {
 
//   // Url of the Identity Provider
//   issuer: 'https://auth.dev.interne.montreal.ca',
 
//   // URL of the SPA to redirect the user to after login
//   redirectUri: window.location.origin +'/authorize',

//   // URL of the SPA to redirect the user after silent refresh
//   silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
 
//   // The SPA's id. The SPA is registerd with this id at the auth-server
//   clientId: '@!4025.CA62.9BB6.16C5!0001!2212.0010!0008!2212.0070',
 
//   // set the scope for the permissions the client should request
//   // The first three are defined by OIDC. The 4th is a usecase-specific one
//   scope: 'openid profile user_name',
//   responseType : 'id_token token token_expires',
//   timeoutFactor: 0.01,
//   showDebugInformation: true,
//   silentRefreshIFrameName: 'XXXXXXX-refresh',
//   silentRefreshShowIFrame: true
// }


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private oauthService: OAuthService) {
    console.log('Constructor MyApp');
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      

      statusBar.styleDefault();
      splashScreen.hide();
      
    });
  }

  async ngOnInit() {
    // Let's navigate from TabsPage to Page1
    console.log('ngOnInit configuring oauthService');
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // Silent refresh activate
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events.subscribe(e => {
      // tslint:disable-next-line:no-console
      console.log('oauth/oidc event', e);
    });
    this.oauthService.events
    .pipe(filter(e => e.type === 'token_received'))
    .subscribe(e => {
      console.log('RECEIVED token event', e);
      // this.oauthService.loadUserProfile();
    });

    console.log('ionViewDidLoad LoginPage, hasValidAccessToken=',this.oauthService.hasValidAccessToken());
    /*if (this.oauthService.hasValidAccessToken()) {
      console.log('Validate!!');
      this.rootPage = TabsPage;
    }*/
    if (this.oauthService.hasValidAccessToken()) {
      console.log('platffor ready access token ok!!');
      this.rootPage = TabsPage;
    } else {
      console.log('platffor ready but no valid accest takeng!!');
      this.rootPage = LoginPage;
    }
  }
}
