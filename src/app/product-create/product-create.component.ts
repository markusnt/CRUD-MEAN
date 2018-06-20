import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  produto_id = '';
  nro_serie = '';
  vigencia = '';
  suporte_modalidade = '';
  suporte_fornecedor = '';
  data_end_suport = '';
  versao_software = '';
  fabricante = '';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'produto_id' : [null, Validators.required],
      'nro_serie' : [null, Validators.required],
      'vigencia' : [null, Validators.required],
      'suporte_modalidade' : [null, Validators.required],
      'suporte_fornecedor' : [null, Validators.required],
      'data_end_suport' : [null, Validators.required],
      'versao_software' : [null, Validators.required],
      'fabricante' : [null, Validators.required]
  });
  }

  onFormSubmit(form: NgForm) {
    this.api.postProduct(form)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
