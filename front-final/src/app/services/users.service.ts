import {Auth} from './../models/auth.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './../models/user.model';
import {Subject} from 'rxjs';

// import '@rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userToken = '';
  userEmail = '';

  userLoggedIn = false;
  userLoggedInCheck = new Subject<boolean>();

  readonly baseURL = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  logIn(loginData: Auth) {
    this.http
    .post<{message: string, token: string, error: string, userEmail: string}>(this.baseURL + '/login', loginData)
    .subscribe(
      (responseData) => {
       // console.log(responseData);
        this.userToken = responseData.token;
        // console.log(this.userToken );

        this.userEmail = responseData.userEmail;
        alert(responseData.message);

        this.userLoggedIn = true;
        this.userLoggedInCheck.next(true);
      });

  }

  signUp(formData: User){
    //console.log(formData);
    this.http.post<{message: string, token: string}>(this.baseURL + '/signup', formData)
      .subscribe(
        (responseData) => {
         // console.log(responseData);
          const token = responseData.token;
          this.userToken = token;
         // this.generatedToken.next(token);
         alert(responseData.message);

          this.userLoggedIn = true;
          this.userLoggedInCheck.next(true);
        });
  }

  logout() {
    this.userLoggedIn = false;
    this.userLoggedInCheck.next(false);
    window.location.reload();
  }
}
