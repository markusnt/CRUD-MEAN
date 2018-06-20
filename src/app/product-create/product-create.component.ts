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
  nro_contrato = '';
  termino_vigencia = '';
  suporte = '';
  suporte_fornecedor = '';
  versao_software = '';
  fabricante = '';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'produto_id' : [null, Validators.required],
      'nro_serie' : [null, Validators.required],
      'nro_contrato' : [null, Validators.required],
      'termino_vigencia' : [null, Validators.required],
      'suporte' : [null, Validators.required],
      'suporte_fornecedor' : [null, Validators.required],
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
