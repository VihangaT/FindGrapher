import { Photographer } from '../../models/photographer.model';
import {Component, Input, OnInit} from '@angular/core';

import { PhotographersService } from '../../services/photographers.service';

@Component({
  selector: 'app-event-photographer',
  templateUrl: './event-photographer.component.html',
  styleUrls: ['./event-photographer.component.css', '../photographers.component.css']
})
export class EventPhotographerComponent implements OnInit {

  @Input() index: number;
  photographers: Photographer[];
  constructor( private photograperService: PhotographersService) { }

  ngOnInit() {


    this.photograperService.signInPhotographer();
    this.photographers =  this.photograperService.photographers;

    this.photograperService.photographersUpdated.subscribe((photographers) => {
      this.photographers = photographers;
    });

}
}
