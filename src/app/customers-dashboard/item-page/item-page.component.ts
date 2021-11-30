import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ItemStructureService } from 'src/app/customers-dashboard/item-structure.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  sub: any;
  type!: string | null;

  title = 'ng-bootstrap-modal-demo';
  closeResult!: string;
  modalOptions!: NgbModalOptions;

  constructor(private Activatedroute: ActivatedRoute, private modalService: NgbModal, private itemStructureService: ItemStructureService, private globals: Globals) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }

    this.Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.type = params.get('type');
      console.log('Call API by : ' + this.type);
      this.globals.itemType = this.type;

      // this.resetArray(this.globals.myAttributes);
      const useremail = 'dinod@gmail.com';
      this.itemStructureService.getItemStructure(useremail, this.type).subscribe((data: any) => {
        // this.userAttributes = data;
        this.resetArray(this.globals.myAttributes);
        console.log(data.structureFields);
        for (var key in data.structureFields) {
          this.globals.myAttributes.push(key);
        }
        //console.log(this.globals.myAttributes);
      });
    });
  }

  ngOnInit(): void {

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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  resetArray(source: any) {
    source.splice(0, source.length);
  }
}
