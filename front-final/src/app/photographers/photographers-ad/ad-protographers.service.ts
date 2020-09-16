import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import {  HttpErrorResponse } from '@angular/common/http';
import {IphotographerAdv} from '../../models/photographer-ad.model';
@Injectable({
  providedIn: 'root'
})
export class AdProtographersService {
  private ScrapedDataURL='api/products/products.json';
  constructor(private http:HttpClient) { }

  getProducts():Observable<IphotographerAdv[]>{
    return this.http.get<IphotographerAdv[]>(this.ScrapedDataURL).pipe(
      tap(data => console.log('All: '+JSON.stringify(data))),
      catchError(this.handleError)
    );
}

private handleError(err:HttpErrorResponse){
  let errorMessage='';
  if(err.error instanceof ErrorEvent){
    errorMessage='An error occured: $(err.error.message)';
  }else{
    errorMessage='Server returned code: $(err.status), error message is: $(err.message)';
  }
  console.error(errorMessage);
  return throwError(errorMessage);
  
  
}
}
