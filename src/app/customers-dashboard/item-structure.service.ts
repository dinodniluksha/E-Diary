import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemStructure } from './item-struct';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemStructureService {

  constructor(private http: HttpClient) { }

  getItemStructures(user: any): Observable<ItemStructure> {
    return this.http.get<ItemStructure>('https://e-diary-app.herokuapp.com/get-item-structures?useremail=' + user)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getItemStructure(user: any, itemType: any): Observable<ItemStructure> {
    return this.http.get<ItemStructure>('https://e-diary-app.herokuapp.com/get-item-structure?useremail=' + user + '&itemtype=' + itemType)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  callCreateItemStructureApi(formData: any) {
    this.http.post('https://e-diary-app.herokuapp.com/create-item-structure', formData).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          window.alert(response.itemType + ' category is created by ' + response.userEmail + ' successfully');
          window.location.reload();
        },
        error: (error: any) => {
          window.alert(error.error.message);
        }
      }
    );
  }

  httpError(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
