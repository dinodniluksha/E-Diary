import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class ItemStructure {
  itemType!: string;
  structureFields!: any;
}

@Injectable({
  providedIn: 'root'
})
export class ItemStructureService {

  constructor(private http: HttpClient) { }

  getItemStructures(user: any) {
    console.log('Call Item structures retriew API');
    this.http.get('http://e-diary-app.herokuapp.com/get-item-structures?useremail=' + user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  getItemStructure(user: any, itemType: any): Observable<ItemStructure> {
    return this.http.get<ItemStructure>('http://e-diary-app.herokuapp.com/get-item-structure?useremail=' + user + '&itemtype=' + itemType)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
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
