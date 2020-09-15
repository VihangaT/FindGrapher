import {PhotographersService} from './../../services/photographers.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-photographer-login',
  templateUrl: './photographer-login.component.html',
  styleUrls: ['./photographer-login.component.css']
})
export class PhotographerLoginComponent implements OnInit {

  form: FormGroup;

  constructor(private photographersService: PhotographersService, public router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.form.valid) {
      // console.log("ok");
      this.photographersService.login({
        email: this.form.value.email,
        password: this.form.value.password,
      });
      this.router.navigate(['welcome']);

    } else {
      return;
    }

  }
}
