import { UsersService } from './../../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  form: FormGroup;

  constructor(private usersService: UsersService, public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.form.valid) {
     // console.log("ok");
      this.usersService.logIn({
        email: this.form.value.email,
        password: this.form.value.password,
      });
      this.router.navigate(['welcome']);

    }else alert('Enter Valid Data');

  }

}
