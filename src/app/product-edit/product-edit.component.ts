import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  id:string='';
  produto_id:string= '';
  nro_serie:string= '';
  nro_contrato:string= '';
  termino_vigencia:string= '';
  suporte:string= '';
  suporte_fornecedor:string= '';
  versao_software:string= '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
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

  getProduct(id) {
    this.api.getProduct(id).subscribe(data => {
      this.id = data._id;
      this.productForm.setValue({
        produto_id: data.produto_id,
        nro_serie: data.nro_serie,
        nro_contrato: data.nro_contrato,
        termino_vigencia: data.termino_vigencia,
        suporte: data.suporte,
        suporte_fornecedor: data.suporte_fornecedor,
        versao_software: data.versao_software
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateProduct(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  productDetails() {
    this.router.navigate(['/product-details', this.id]);
  }
}
