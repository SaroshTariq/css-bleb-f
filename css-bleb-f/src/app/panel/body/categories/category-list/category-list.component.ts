import { Component, OnInit } from '@angular/core';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { DataService } from '../../../services/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { ToastGeneratorService } from '../../../../toast-generator.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  searchString: string = '';
  categories = [];
  checkedCategories = [];
  categoryModalRef: BsModalRef;
  constructor(private _service : DataService, private modalService: BsModalService, private _tgs: ToastGeneratorService) {
  }

  ngOnInit() {
    this.initData();
  }

  initData(){
    this.checkedCategories = [];  
    this._service.categories.subscribe(res => {
      this.categories = res.json();
    });
  }

  openCategoryModal(category_id){
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered modal-lg  scroll-wrap',
      initialState: {
        category_id
      }
    }
    this.categoryModalRef = this.modalService.show(CategoryModalComponent, config);
    this.categoryModalRef.content.action.subscribe(res => {
      if(res=='saved'){
        this.initData();
        this._tgs.showToast(200);
      }
      
    });
  }

  onCategoryChecBoxChange(category_id, event){
    if(event.target.checked){
      this.checkedCategories.push(category_id);
    }
    else{
      var i = this.checkedCategories.indexOf(this.checkedCategories.filter(e => e == category_id)[0]);
      this.checkedCategories.splice(i, 1);
    }
    console.log(this.checkedCategories);
    
  }

  onDeleteClicked(){
    var message = '';
    message = message + '<p>Are you sure you want to delete?</p>';
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered  scroll-wrap',
      initialState: {
       message : message
        }
    }
    var confirmationModalRef = this.modalService.show(ConfirmationModalComponent, config);
    confirmationModalRef.content.action.subscribe(res => {
      if(res == 'yes'){
        this.deleteSelectedCategory();
        this._tgs.showToast(200);
      }
    });
  }

  deleteSelectedCategory(){
    this._service.deleteCategories(this.checkedCategories).subscribe(res => {
      this.initData();
    })
  }
}
