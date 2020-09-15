import { Component, OnInit } from '@angular/core';
import { PhotographersService } from '../../services/photographers.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { mimeType } from "./mime-type.validator";

import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-photographer-register',
  templateUrl: './photographer-register.component.html',
  styleUrls: ['./photographer-register.component.css']
})
export class PhotographerRegisterComponent {


  constructor(private photograperService: PhotographersService, public router: Router) { }
  passwordMessage: string;
  imagePreview = ['', '', '', '', ''];
  isLoading: boolean;

  photographerSignUp = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    speciality: new FormGroup({
      1: new FormControl(false, Validators.required),
      2: new FormControl(false, Validators.required),
      3: new FormControl(false, Validators.required),
      4: new FormControl(false, Validators.required),
      5: new FormControl(false, Validators.required),
      6: new FormControl(false, Validators.required),
      7: new FormControl(false, Validators.required),
      8: new FormControl(false, Validators.required),
    }),
    email: new FormControl('', Validators.required),
    contactNo: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    image1: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    image2: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    image3: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    image4: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    image5: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
  });

  passwordValidator(value1, value2) {
    if (value1 !== value2) {
      this.passwordMessage = 'Passwords does not tally';
    } else {
      this.passwordMessage = '';
    }
  }

  onSubmit() {
    console.log(this.photographerSignUp.value.gender);
    if (this.passwordMessage === '') {
      if (this.imagePreview[0] !== '' &&
        this.imagePreview[1] !== '' &&
        this.imagePreview[2] !== '' &&
        this.imagePreview[3] !== '' &&
        this.imagePreview[4] !== '') {
        if (this.photographerSignUp.invalid) {
          alert('Insert All fields');
          return;
        } else {
          this.isLoading = true;

          this.photograperService.signUpPhotographer(
            this.photographerSignUp.value.firstName,
            this.photographerSignUp.value.lastName,
            this.photographerSignUp.value.country,
            this.photographerSignUp.value.city,
            this.photographerSignUp.get('speciality').get('1').value,
            this.photographerSignUp.get('speciality').get('2').value,
            this.photographerSignUp.get('speciality').get('3').value,
            this.photographerSignUp.get('speciality').get('4').value,
            this.photographerSignUp.get('speciality').get('5').value,
            this.photographerSignUp.get('speciality').get('6').value,
            this.photographerSignUp.get('speciality').get('7').value,
            this.photographerSignUp.get('speciality').get('8').value,
            this.photographerSignUp.value.gender,
            this.photographerSignUp.value.email,
            this.photographerSignUp.value.contactNo,
            this.photographerSignUp.value.password,
            this.photographerSignUp.value.image1,
            this.photographerSignUp.value.image2,
            this.photographerSignUp.value.image3,
            this.photographerSignUp.value.image4,
            this.photographerSignUp.value.image5,
          );

          // .subscribe((res) => {
          //   alert('Registration Successfull');
          //   console.log('response' + res);
          // });
          //this.photographerSignUp.reset();
        }

        this.router.navigate(['welcome']);
      } else {
        alert('Upload 5 photos');
      }
    } else {
      return;
    }
  }

  onImagePicked(event: Event, selector: number) {
    const file = (event.target as HTMLInputElement).files[0];
    switch (selector) {
      case 1:
        this.photographerSignUp.patchValue({ image1: file });
        this.photographerSignUp.get('image1').updateValueAndValidity();
        break;
      case 2:
        this.photographerSignUp.patchValue({ image2: file });
        this.photographerSignUp.get('image2').updateValueAndValidity();
        break;
      case 3:
        this.photographerSignUp.patchValue({ image3: file });
        this.photographerSignUp.get('image3').updateValueAndValidity();
        break;
      case 4:
        this.photographerSignUp.patchValue({ image4: file });
        this.photographerSignUp.get('image4').updateValueAndValidity();
        break;
      case 5:
        this.photographerSignUp.patchValue({ image5: file });
        this.photographerSignUp.get('image5').updateValueAndValidity();
        break;
    }

    // this.photographerSignUp.patchValue({ image: file });
    // this.photographerSignUp.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview[selector - 1] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  resetForm() {
    console.log('Reset Form');
  }

  register() {
    console.log(this.photographerSignUp.get('speciality'));
  }
}



