import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  isShowContent = false;
  isShowForm = false;
  constructor() { }

  ngOnInit() {
  }

  showView(){
    this.isShowContent = !this.isShowContent;
  }

  showForm(){
    this.isShowForm = !this.isShowForm;
  }

}
