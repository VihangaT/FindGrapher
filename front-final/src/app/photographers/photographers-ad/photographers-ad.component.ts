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
  imgWidth: number = 50;
  imgMargin: number = 2;
  showImage: boolean = true;
  errorMessage: string;

  // tslint:disable-next-line: variable-name
  _listfilter: string;
  get listfilter(): string {
    return this._listfilter;
  }

  set listfilter(value: string) {
    this._listfilter = value;
    this.filteredProducts = this._listfilter
      ? this.performFilter(this._listfilter)
      : this.products;
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Scraped Photographers List:' + message;
  }

  // tslint:disable-next-line: member-ordering
  filteredProducts: IphotographerAdv[];

  // tslint:disable-next-line: member-ordering
  products: IphotographerAdv[] = [];
 
  constructor(private Service: AdProtographersService) {}

  performFilter(filterBY: string): IphotographerAdv[] {
    filterBY = filterBY.toLocaleLowerCase();
    return this.products.filter(
      (prod: IphotographerAdv) =>
        prod.country.toLocaleLowerCase().indexOf(filterBY) !== -1 ||
        prod.specialityField.toLocaleLowerCase().indexOf(filterBY) !== -1
    );
  }

  ngOnInit(): void {
    this.Service.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
