import { Photographer } from './../models/photographer.model';
import { Auth } from './../models/auth.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, from, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
// import '@rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class PhotographersService {

  token = '';
  logedInPhotographer: any;
  photographers: Photographer[];
  photographerLoggedIn = false;
  photographerLoggedInCheck = new Subject<boolean>();

  photographersUpdated = new Subject<Photographer[]>();
  generatedToken = new Subject<string>();

  updatedLoggedInPhotographer = new Subject<any>();

  readonly baseURL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  postPhotographer(usr: Photographer) {
    return this.http.post(this.baseURL, usr);
  }

  signUpPhotographer(
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    specialityField1: string,
    specialityField2: string,
    specialityField3: string,
    specialityField4: string,
    specialityField5: string,
    specialityField6: string,
    specialityField7: string,
    specialityField8: string,
    gender: string,
    email: string,
    contactNo: string,
    password: string,
    image1: File,
    image2: File,
    image3: File,
    image4: File,
    image5: File) {
    const signUpData = new FormData();

    //let specialityFormSTR = '';

    // for (let i = 0; i < 8; i++) {
    //   if (specialityForm[i] == true) specialityFormSTR = specialityFormSTR + '1';
    //   else specialityFormSTR =  specialityFormSTR + '0';
    // }
    //console.log(specialityFormSTR);

    signUpData.append('firstName', firstName);
    signUpData.append('lastName', lastName);
    signUpData.append('city', city);
    signUpData.append('country', country);
    signUpData.append('email', email);
    signUpData.append('specialityField1', JSON.stringify(specialityField1));
    signUpData.append('specialityField2', JSON.stringify(specialityField2));
    signUpData.append('specialityField3', JSON.stringify(specialityField3));
    signUpData.append('specialityField4', JSON.stringify(specialityField4));
    signUpData.append('specialityField5', JSON.stringify(specialityField5));
    signUpData.append('specialityField6', JSON.stringify(specialityField6));
    signUpData.append('specialityField7', JSON.stringify(specialityField7));
    signUpData.append('specialityField8', JSON.stringify(specialityField8));
    signUpData.append('contactNo', contactNo);
    signUpData.append('gender', gender);
    signUpData.append('password', password);
    signUpData.append('image1', image1, email + "1");
    signUpData.append('image2', image2, email + "2");
    signUpData.append('image3', image3, email + "3");
    signUpData.append('image4', image4, email + "4");
    signUpData.append('image5', image5, email + "5");

    this.http.post

    <{ message: string, token: string, photographer: any }>('http://localhost:3000/api/photographer/signup', signUpData)
      .subscribe(
        (responseData) => {
          // console.log(responseData);
          const token = responseData.token;
          this.token = token;
          // this.generatedToken.next(token);
          alert(responseData.message);

          //this.logedInPhotographer.next(responseData.photographer);

          this.photographerLoggedIn = true;
          this.photographerLoggedInCheck.next(true);

          const fetchedPhotographer = {
            firstName: responseData.photographer.firstName,
            lastName: responseData.photographer.lastName,
            country: responseData.photographer.country,
            city: responseData.photographer.city,
            specialityField1: responseData.photographer.tag1,
            specialityField2: responseData.photographer.tag2,
            specialityField3: responseData.photographer.tag3,
            specialityField4: responseData.photographer.tag4,
            specialityField5: responseData.photographer.tag5,
            specialityField6: responseData.photographer.tag6,
            specialityField7: responseData.photographer.tag7,
            specialityField8: responseData.photographer.tag8,
            gender: responseData.photographer.gender,
            email: responseData.photographer.email,
            contactNo: responseData.photographer.contactNo,
            image1: responseData.photographer.imgUrl1,
            image2: responseData.photographer.imgUrl2,
            image3: responseData.photographer.imgUrl3,
            image4: responseData.photographer.imgUrl4,
            image5: responseData.photographer.imgUrl5
          };

          this.logedInPhotographer = fetchedPhotographer;
        });
  }

  signInPhotographer() {
    let msg = '';
    this.http
      .get<{ message: string; photographers: any }>("http://localhost:3000/api/photographer")
      .pipe(
        map(postData => {
          msg = postData.message;
          return postData.photographers.map(data => {
            return {
              firstName: data.firstName,
              lastName: data.lastName,
              city: data.city,
              country: data.country,
              email: data.email,
              specialityField1: data.tag1,
              specialityField2: data.tag2,
              specialityField3: data.tag3,
              specialityField4: data.tag4,
              specialityField5: data.tag5,
              specialityField6: data.tag6,
              specialityField7: data.tag7,
              specialityField8: data.tag8,
              gender: data.gender,
              password: data.password,
              contactNo: data.contactNo,
              imgUrl1: data.imgUrl1,
              imgUrl2: data.imgUrl2,
              imgUrl3: data.imgUrl3,
              imgUrl4: data.imgUrl4,
              imgUrl5: data.imgUrl5,

            };
          });
        })
      )
      .subscribe(transformedPosts => {
        //console.log(msg);
        this.photographers = transformedPosts;
        this.photographersUpdated.next([...this.photographers]);
      });
  }

  login(loginData: Auth) {
    this.http
      .post<{ message: string, token: string, photographer: any }>("http://localhost:3000/api/photographer/login", loginData)
      .subscribe(
        (responseData) => {
          // console.log(responseData);
          const token = responseData.token;
          this.token = token;
          // console.log(this.token );
          alert(responseData.message);

          this.photographerLoggedIn = true;
          this.photographerLoggedInCheck.next(true);

          const fetchedPhotographer = {
            firstName: responseData.photographer.firstName,
            lastName: responseData.photographer.lastName,
            country: responseData.photographer.country,
            city: responseData.photographer.city,
            specialityField1: responseData.photographer.tag1,
            specialityField2: responseData.photographer.tag2,
            specialityField3: responseData.photographer.tag3,
            specialityField4: responseData.photographer.tag4,
            specialityField5: responseData.photographer.tag5,
            specialityField6: responseData.photographer.tag6,
            specialityField7: responseData.photographer.tag7,
            specialityField8: responseData.photographer.tag8,
            gender: responseData.photographer.gender,
            email: responseData.photographer.email,
            contactNo: responseData.photographer.contactNo,
            image1: responseData.photographer.imgUrl1,
            image2: responseData.photographer.imgUrl2,
            image3: responseData.photographer.imgUrl3,
            image4: responseData.photographer.imgUrl4,
            image5: responseData.photographer.imgUrl5
          };

          this.logedInPhotographer = fetchedPhotographer;
          //console.log(fetchedPhotographer);
        });
  }

  getToken() {
    return this.token;
  }

  updatePhotographer(
    prevEmail: string,
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    specialityField1: string,
    specialityField2: string,
    specialityField3: string,
    specialityField4: string,
    specialityField5: string,
    specialityField6: string,
    specialityField7: string,
    specialityField8: string,
    gender: string,
    email: string,
    contactNo: string,
    image1: File | string,
    image2: File | string,
    image3: File | string,
    image4: File | string,
    image5: File | string) {

    const updateData = new FormData();

    updateData.append('prevEmail', prevEmail);
    updateData.append('firstName', firstName);
    updateData.append('lastName', lastName);
    updateData.append('city', city);
    updateData.append('country', country);
    updateData.append('email', email);
    updateData.append('specialityField1', specialityField1);
    updateData.append('specialityField2', specialityField2);
    updateData.append('specialityField3', specialityField3);
    updateData.append('specialityField4', specialityField4);
    updateData.append('specialityField5', specialityField5);
    updateData.append('specialityField6', specialityField6);
    updateData.append('specialityField7', specialityField7);
    updateData.append('specialityField8', specialityField8);
    updateData.append('contactNo', contactNo);
    updateData.append('gender', gender);

    if (typeof image1 === "object") {
      updateData.append('image1', image1, email + "1");
    } else {
      updateData.append('image1', image1);
    }

    if (typeof image2 === "object") {
      updateData.append('image2', image2, email + "2");
    } else {
      updateData.append('image2', image2);
    }

    if (typeof image3 === "object") {
      updateData.append('image3', image1, email + "3");
    } else {
      updateData.append('image3', image3);
    }

    if (typeof image4 === "object") {
      updateData.append('image4', image4, email + "4");
    } else {
      updateData.append('image4', image4);
    }

    if (typeof image5 === "object") {
      updateData.append('image5', image5, email + "5");
    } else {
      updateData.append('image5', image5);
    }

    //console.log("service");
    this.http.patch
    <{ message: string, photographer: any}>('http://localhost:3000/api/photographer/update', updateData)
    .subscribe(
      (responseData) => {
        //console.log("responseData");
        alert(responseData.message);
        this.updatedLoggedInPhotographer.next(
          {
            firstName: responseData.photographer.firstName,
            lastName: responseData.photographer.lastName,
            country: responseData.photographer.country,
            city: responseData.photographer.city,
            specialityField1: responseData.photographer.tag1,
            specialityField2: responseData.photographer.tag2,
            specialityField3: responseData.photographer.tag3,
            specialityField4: responseData.photographer.tag4,
            specialityField5: responseData.photographer.tag5,
            specialityField6: responseData.photographer.tag6,
            specialityField7: responseData.photographer.tag7,
            specialityField8: responseData.photographer.tag8,
            gender: responseData.photographer.gender,
            email: responseData.photographer.email,
            contactNo: responseData.photographer.contactNo,
            image1: responseData.photographer.imgUrl1,
            image2: responseData.photographer.imgUrl2,
            image3: responseData.photographer.imgUrl3,
            image4: responseData.photographer.imgUrl4,
            image5: responseData.photographer.imgUrl5
          }
        );
      });
  }

  sendmail(photoEmail: string, userEmail: string){
    console.log(photoEmail);
    this.http
      .post<{ message: string}>("http://localhost:3000/api/photographer/sendmail", {photoEmail: photoEmail, userEmail: userEmail})
      .subscribe(
        (responseData) => {
          //console.log(fetchedPhotographer);
          alert(responseData.message);
        });
  }

  logout() {
    this.photographerLoggedIn = false;
    this.photographerLoggedInCheck.next(false);
    window.location.reload();
  }
}
