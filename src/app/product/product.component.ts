import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';

import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Product } from '../../../models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayDialog: boolean;
  cols: any[];
  products: any[];
  selectedProduct: Product;

  dataSource = new ProductDataSource(this.api);

  constructor(private router: Router, private api: ApiService) {

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
      { field: 'fabricante', header: 'Fabricante' },
      { field: 'nro_serie', header: 'Nro de Serie' },
     // { field: 'nro_contrato', header: 'Nro do Contrato' },
     // { field: 'suporte', header: 'Suporte' },
     // { field: 'suporte_fornecedor', header: 'Suporte Fornecedor' },
     // { field: 'versao_software', header: 'Versao de Software' },
      { field: 'termino_vigencia', header: 'Termino de Vigencia' }
    ];
  }

  showDialogToAdd() {
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.router.navigate(['/product-details/' + event.data._id]);
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
