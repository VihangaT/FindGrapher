import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Photographer} from "../../models/photographer.model";
import {PhotographersService} from "../../services/photographers.service";

import {UsersService} from '../../services/users.service';


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pro-profile',
  templateUrl: './pro-profile.component.html',
  styleUrls: ['./pro-profile.component.css']
})
export class ProProfileComponent implements OnInit {
  closeResult = '';
  id: number;
  private sub: any;
  private isUser: boolean;
  photographers: Photographer[];
  constructor(
    private route: ActivatedRoute,
    private photograperService: PhotographersService,
    private usersService: UsersService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.isUser = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.photograperService.signInPhotographer();
    this.photographers =  this.photograperService.photographers;

    this.photograperService.photographersUpdated.subscribe((photographers) => {
      this.photographers = photographers;
    });

      if (this.usersService.userToken !== '') {
        this.isUser = true;
      }

  }

  onSendEmail(): void {
    try{

      this.photograperService.sendmail(this.photographers[this.id].email, this.usersService.userEmail);
      this.modalService.dismissAll();
    } catch (error) {
      console.log(error);
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
