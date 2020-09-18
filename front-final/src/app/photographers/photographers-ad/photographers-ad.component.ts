import { Component, OnInit } from '@angular/core';
import { IphotographerAdv } from '../../models/photographer-ad.model';
import { AdProtographersService } from './ad-protographers.service';
@Component({
  selector: 'app-photographers-ad',
  templateUrl: './photographers-ad.component.html',
  styleUrls: ['./photographers-ad.component.css'],
})
export class PhotographersAdComponent implements OnInit {
  pageTitle: string = 'Scraped Photographers List!';
  showImage: boolean = true;
  errorMessage: string;

  // tslint:disable-next-line: variable-name
  _listfilter: string;
  get listfilter(): string {
    return this._listfilter;
  }

  set listfilter(value: string) {
    this._listfilter = value;
    this.filteredPhotographers = this._listfilter
      ? this.performFilter(this._listfilter)
      : this.Photographers;
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Scraped Photographers List:' + message;
  }

  // tslint:disable-next-line: member-ordering
  filteredPhotographers: IphotographerAdv[];

  // tslint:disable-next-line: member-ordering
  Photographers: IphotographerAdv[] = [];
 
  constructor(private Service: AdProtographersService) {}

  performFilter(filterBY: string): IphotographerAdv[] {
    filterBY = filterBY.toLocaleLowerCase();
    return this.Photographers.filter(
      (prod: IphotographerAdv) =>
        prod.country.toLocaleLowerCase().indexOf(filterBY) !== -1 ||
        prod.specialityField.toLocaleLowerCase().indexOf(filterBY) !== -1
    );
  }

  ngOnInit(): void {
    this.Service.getPhotographers().subscribe({
      next: (Photographers) => {
        this.Photographers = Photographers;
        this.filteredPhotographers = this.Photographers;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
