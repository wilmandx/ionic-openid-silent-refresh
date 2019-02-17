import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthResourceServerErrorHandler } from 'angular-oauth2-oidc';

export class OauthErrorHandler
  implements OAuthResourceServerErrorHandler {
  handleError(err: HttpResponse<any>): Observable<any> {
      console.log('error!!!! we detected');
    throw err;
  }
}