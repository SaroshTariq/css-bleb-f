import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { DataService } from '../../../services/data.service';
import { VandV } from '../../../../VandV';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  action = new EventEmitter<any>();
  constructor(public modalRef: BsModalRef, private _service: DataService, private vav: VandV) { 

  }

  newCategory=false;

  category_id = '';
  category = {category_id: '', name: '', description: ''};
  categories = [];

  ngOnInit() {
    this.inItData();
  }

  inItData(){
    this._service.categories.subscribe(res => {
      
      this.categories = res.json();
      if(this.category_id=='3000'){
        this.category = {category_id: this.getMaxID(), name: '', description: ''};
        this.newCategory = true;
      }else{
        this.category = this.categories.filter(e => e.category_id == this.category_id)[0];
        var i = this.categories.indexOf(this.categories.filter(e => e.category_id == this.category_id)[0]);
        this.categories.splice(i, 1);
        this.newCategory = false;
      }
    });
  }

  save(){
    if(this.newCategory){
      this._service.addCategory({category_id:this.category.category_id, name: this.category.name, description: this.category.description}).subscribe(res =>{
        this.modalRef.hide();
        this.action.emit('saved');
      }); 
    }else{
      this._service.updateCategory(this.category.category_id, {name: this.category.name, description: this.category.description}).subscribe(res =>{
        this.modalRef.hide();
        this.action.emit('saved');
      }); 
    }
    
  }
  
  cancel(){
    this.modalRef.hide();
    this.action.emit('canceled');
  }

  errors(fieldName, propName){
    if(this.category[propName]!=null){
      return this.vav.validate(fieldName, this.category[propName], propName, this.categories);
    }
    return [];
  }

  getMaxID() {
    if(this.categories.length!=0){
      return this.categories.reduce((max, p) => p.category_id > max ? p.category_id : max, this.categories[0].category_id)+1;
    }
    return 3001;
  }

  allValid(){
    var keyNames = Object.keys(this.category);
    for(let key of keyNames){
      if(this.errors("None", key).length!=0){
        return false;
      }
    }
    return true;
  }
}
