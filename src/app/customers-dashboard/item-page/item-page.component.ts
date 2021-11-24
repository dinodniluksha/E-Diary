import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  sub: any;
  type!: string | null;
  static itemStructs: any;

  constructor(private _Activatedroute: ActivatedRoute) { }


  ngOnInit(): void {

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.type = params.get('type');
      console.log(this.type);

    });
  }


}
