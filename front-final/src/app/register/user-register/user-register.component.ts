import { Component, OnInit } from '@angular/core';
import {PhotographersService} from '../../services/photographers.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

import { UsersService } from '../../services/users.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent  {

  passwordMessage: string;

  constructor(private usersService: UsersService, public router: Router) {}

  userSignUp = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),

    email: new FormControl('', Validators.required),
    contactNo: new FormControl(null, Validators.required),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  passwordValidator(value1, value2) {
    if (value1 !== value2) {
      this.passwordMessage = 'Passwords does not tally';

    } else {
      this.passwordMessage = '';
    }
  }

  onSubmit() {
    if (this.userSignUp.valid){
// console.warn(this.userSignUp.value);
      // console.log('check' + form.value);
      // this.photograperService.postPhotographer(form.value).subscribe((res) =>{
      //   alert('Registration Successfull');
      //   console.log('response' + res);
      // });
      const userRegData = {
        name: this.userSignUp.value.name,
        country: this.userSignUp.value.country,
        city: this.userSignUp.value.city,
        contactNo: this.userSignUp.value.contactNo,
        email: this.userSignUp.value.email,
        gender: this.userSignUp.value.gender,
        password: this.userSignUp.value.password,
      };

      this.usersService.signUp(userRegData);

      this.router.navigate(['welcome']);
    } else {
      alert("Enter Valid Data");
    }


  }

  resetForm() {
    console.log('Reset Form');
  }


}
