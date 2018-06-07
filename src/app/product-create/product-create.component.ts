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
  produto_id:string='';
  nro_serie:string='';
  nro_contrato:string='';
  termino_vigencia:string='';
  suporte:string='';
  suporte_fornecedor:string='';
  versao_software:string='';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'produto_id' : [null, Validators.required],
      'nro_serie' : [null, Validators.required],
      'nro_contrato' : [null, Validators.required],
      'termino_vigencia' : [null, Validators.required],
      'suporte' : [null, Validators.required],
      'suporte_fornecedor' : [null, Validators.required],
      'versao_software' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.postProduct(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
