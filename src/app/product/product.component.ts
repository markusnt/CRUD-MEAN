import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource = new ProductDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProducts()
      .subscribe(res => {
        console.log(res);
        this.products = res;
      }, err => {
        console.log(err);
      });
  }
}

export class ProductDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getProducts();
  }

  disconnect() {

  }
}
