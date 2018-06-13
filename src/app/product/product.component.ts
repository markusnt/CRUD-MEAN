import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';

import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

import { AccordionModule } from 'primeng/accordion';     // accordion and accordion tab
import { MenuItem } from 'primeng/api';                 // api
import {TableModule} from 'primeng/table';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[];
  cols: any[];
  data: any;
  displayedColumns = ['produto_id', 'nro_serie', 'termino_vigencia'];
  dataSource = new ProductDataSource(this.api);

  constructor(private api: ApiService) {

    this.data = {
      labels: ['produto_id', 'nro_serie', 'termino_vigencia'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
              ],
              hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
              ]
          }]
      };

   }

  ngOnInit() {
    this.api.getProducts()
      .subscribe(res => {
        console.log(res);
        this.products = res;
      }, err => {
        console.log(err);
      });

    this.cols = [
      { field: 'produto_id', header: 'ID Produto' },
      {field: 'nro_serie', header: 'Nro de Serie' },
      { field: 'termino_vigencia', header: 'Termino de Vigencia' }
    ];
  }
}

export class ProductDataSource extends DataSource<any> {

  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getProducts();
  }

  disconnect() {

  }
}
