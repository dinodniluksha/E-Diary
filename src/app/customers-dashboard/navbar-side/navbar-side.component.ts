import { Component, OnInit } from '@angular/core';
import { ItemStructure } from '../item-struct';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ItemStructureService } from '../item-structure.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.css']
})
export class NavbarSideComponent implements OnInit {

  sub: any;

  title = 'ng-bootstrap-modal-demo';
  closeResult!: string;
  modalOptions!: NgbModalOptions;

  constructor(
    private modalService: NgbModal,
    private itemStructureService: ItemStructureService,
    private globals: Globals,
    private router: Router,
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  itemStructs!: ItemStructure[];

  ngOnInit(): void {
    if (localStorage.getItem('socialusers') != null) {
      let useremail = this.globals.userEmail;
      this.itemStructureService.getItemStructures(useremail).subscribe({
        next: (data: any) => {
          //console.log(data.items);
          this.itemStructs = data.items;
        },
        complete: () => {
          console.log(this.itemStructs);
          if (this.itemStructs.length > 0) {
            this.router.navigate(['/home/' + this.itemStructs[0].itemType]);
          }
        }
      });
    }
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
}


