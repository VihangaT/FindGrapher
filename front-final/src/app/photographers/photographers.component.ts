import { Photographer } from './../models/photographer.model';
import {Component, Input, OnInit} from '@angular/core';

import { PhotographersService } from '../services/photographers.service';

@Component({
  selector: 'app-photographers',
  templateUrl: './photographers.component.html',
  styleUrls: ['./photographers.component.css']
})
export class PhotographersComponent implements OnInit {
  @Input() index: number;
  photographers: Photographer[];
  constructor(private photograperService: PhotographersService) { }

  ngOnInit() {
    this.photograperService.signInPhotographer();
    this.photographers =  this.photograperService.photographers;

    this.photograperService.photographersUpdated.subscribe((photographers) => {
      this.photographers = photographers;
    });

    // console.log(this.photographers[this.photographers.length - 1].specialityForm[0]);
  }


}
