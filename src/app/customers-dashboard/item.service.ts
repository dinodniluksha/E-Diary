import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  callCreateItemEndPoint(formData: any) {
    this.http.post('https://e-diary-app.herokuapp.com/create-item', formData).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => console.log(error)
    );
  }

  getItems(user: any, itemType: any): Observable<Item> {
    return this.http.get<Item>('https://e-diary-app.herokuapp.com/get-items?useremail=' + user + '&type=' + itemType)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  deleteItem(user: any, itemId: any) {
    this.http.delete('https://e-diary-app.herokuapp.com/delete-item?useremail=' + user + '&id=' + itemId).subscribe(
      (response) => {
        //console.log(response);
        window.alert('Record is deleted successfully');
        window.location.reload();
      },
      (error) => console.log(error)
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
