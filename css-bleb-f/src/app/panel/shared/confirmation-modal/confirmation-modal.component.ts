import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  message = '';

  @Output() action = new EventEmitter<any>();
  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
  }


  yes(){
    this.modalRef.hide();
    this.action.emit('yes');
  }
  no(){
    this.modalRef.hide();
    this.action.emit('no');
  }
}
