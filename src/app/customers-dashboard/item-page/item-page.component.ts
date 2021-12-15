import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/customers-dashboard/item.service';
import { Globals } from '../globals';
import { Item } from '../item';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  sub: any;
  type!: string | null;
  userEmail: string | null = this.globals.userEmail;

  title = 'ng-bootstrap-modal-demo';
  closeResult!: string;
  modalOptions!: NgbModalOptions;

  items = ['text', 'number', 'date'];
  itemPack!: Item[];
  item!: Item;
  cardNo!: number;

  constructor(private Activatedroute: ActivatedRoute, private modalService: NgbModal, private itemService: ItemService, private globals: Globals) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }

    this.Activatedroute.paramMap.subscribe({
      next: params => {
        console.log(params);
        this.type = params.get('type');
        console.log('Setting global type : ' + this.type);
        this.globals.itemType = this.type;
        this.callGetItems();
      },
      complete: () => {
        console.log('Setted global type : ');

      }
    });

    // this.itemService.getItems(this.userEmail, this.type).subscribe(

    //   (data: any) => {
    //     console.log(data);
    //     // this.itemPack = data.items;
    //   }

    // );
  }

  ngOnInit(): void { }

  callGetItems() {
    this.itemService.getItems(this.userEmail, this.type).subscribe(
      (data: any) => {
        //console.log(data);
        this.itemPack = data.items;
        console.log(this.itemPack);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  openItem(content: any, item: any, value: number) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
    this.item = item;
    this.cardNo = value;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
