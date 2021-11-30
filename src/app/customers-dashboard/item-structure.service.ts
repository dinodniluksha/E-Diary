import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        window.location.reload();
      },
      (error) => console.log(error)
    );
  }
}
