import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  callCreateItemEndPoint(formData: any) {
    this.http.post('http://e-diary-app.herokuapp.com/create-item', formData).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => console.log(error)
    );
  }
}
