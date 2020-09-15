import { UsersService } from './users.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { PhotographersService } from "./photographers.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private photographersService: PhotographersService, private usersService: UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let authToken = this.photographersService.token;
    if (this.usersService.userToken !== '') {
      //console.log("no")
      authToken = this.usersService.userToken;
    }

    //console.log(authToken);
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "photographer " + authToken)
    });
    return next.handle(authRequest);
  }
}
