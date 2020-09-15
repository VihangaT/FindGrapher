import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Photographer } from './../models/photographer.model';
import { Component, OnInit } from '@angular/core';
import { PhotographersService } from '../services/photographers.service';

import { mimeType } from "./mime-type.validator";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fetchedPhotographer: any;

  passwordMessage: string;
  imagePreview = ['', '', '', '', ''];
  isLoading: boolean;
  photographerLoggedIn = false;
  editMode: boolean = true;

  photographerUpdating: FormGroup;

  constructor(private photograperService: PhotographersService, private router: Router) { }

  ngOnInit() {

    this.photographerLoggedIn = this.photograperService.photographerLoggedIn;
    this.photograperService.updatedLoggedInPhotographer.subscribe(updatedPhotographer => {
      this.fetchedPhotographer = updatedPhotographer;
    });
    if (!this.photographerLoggedIn) {
      this.router.navigate(['/login/photographer-login']);
    }
    this.photographerUpdating = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      speciality: new FormGroup({
        1: new FormControl(false),
        2: new FormControl(false),
        3: new FormControl(false),
        4: new FormControl(false),
        5: new FormControl(false),
        6: new FormControl(false),
        7: new FormControl(false),
        8: new FormControl(false),
      }),
      contactNo: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
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

    this.fetchedPhotographer = this.photograperService.logedInPhotographer;
    this.photographerUpdating.patchValue({
      firstName: this.photograperService.logedInPhotographer.firstName,
      lastName: this.photograperService.logedInPhotographer.lastName,
      country: this.photograperService.logedInPhotographer.country,
      city: this.photograperService.logedInPhotographer.city,

      speciality: {
        1: this.photograperService.logedInPhotographer.specialityField1,
        2: this.photograperService.logedInPhotographer.specialityField2,
        3: this.photograperService.logedInPhotographer.specialityField3,
        4: this.photograperService.logedInPhotographer.specialityField4,
        5: this.photograperService.logedInPhotographer.specialityField5,
        6: this.photograperService.logedInPhotographer.specialityField6,
        7: this.photograperService.logedInPhotographer.specialityField7,
        8: this.photograperService.logedInPhotographer.specialityField8
      },
      gender: this.photograperService.logedInPhotographer.gender,
      contactNo: this.photograperService.logedInPhotographer.contactNo,
      image1: this.photograperService.logedInPhotographer.image1,
      image2: this.photograperService.logedInPhotographer.image2,
      image3: this.photograperService.logedInPhotographer.image3,
      image4: this.photograperService.logedInPhotographer.image4,
      image5: this.photograperService.logedInPhotographer.image5
    });

  }

  onSubmit() {
    //console.log(this.photographerUpdating.value.gender);
    if (this.photographerUpdating.invalid) {
      alert('Insert All fields');
      return;
    } else {
      this.isLoading = true;

      this.photograperService.updatePhotographer(
        this.fetchedPhotographer.email,
        this.photographerUpdating.value.firstName,
        this.photographerUpdating.value.lastName,
        this.photographerUpdating.value.country,
        this.photographerUpdating.value.city,
        this.photographerUpdating.get('speciality').get('1').value,
        this.photographerUpdating.get('speciality').get('2').value,
        this.photographerUpdating.get('speciality').get('3').value,
        this.photographerUpdating.get('speciality').get('4').value,
        this.photographerUpdating.get('speciality').get('5').value,
        this.photographerUpdating.get('speciality').get('6').value,
        this.photographerUpdating.get('speciality').get('7').value,
        this.photographerUpdating.get('speciality').get('8').value,
        this.photographerUpdating.value.gender,
        this.photographerUpdating.value.email,
        this.photographerUpdating.value.contactNo,
        this.photographerUpdating.value.image1,
        this.photographerUpdating.value.image2,
        this.photographerUpdating.value.image3,
        this.photographerUpdating.value.image4,
        this.photographerUpdating.value.image5,
      );
      this.editDetails();
    }
  }

  onImagePicked(event: Event, selector: number) {
    const file = (event.target as HTMLInputElement).files[0];
    switch (selector) {
      case 1:
        this.photographerUpdating.patchValue({ image1: file });
        this.photographerUpdating.get('image1').updateValueAndValidity();
        break;
      case 2:
        this.photographerUpdating.patchValue({ image2: file });
        this.photographerUpdating.get('image2').updateValueAndValidity();
        break;
      case 3:
        this.photographerUpdating.patchValue({ image3: file });
        this.photographerUpdating.get('image3').updateValueAndValidity();
        break;
      case 4:
        this.photographerUpdating.patchValue({ image4: file });
        this.photographerUpdating.get('image4').updateValueAndValidity();
        break;
      case 5:
        this.photographerUpdating.patchValue({ image5: file });
        this.photographerUpdating.get('image5').updateValueAndValidity();
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
    console.log(this.photographerUpdating.get('speciality'));
  }

  editDetails() {
    this.editMode = !this.editMode;
  }
}
