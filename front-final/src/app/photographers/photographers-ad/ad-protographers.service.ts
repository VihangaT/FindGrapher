import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import {  HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdProtographersService {

  constructor() { }
}
