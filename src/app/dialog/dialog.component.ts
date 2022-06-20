import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  frescuraList = ["Brand new", "Second hand"];
  productForm !: FormGroup;
  actionBtn : string = "Guardar";

  constructor(private FormBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      name: ['', Validators.required],
      categoria: ['', Validators.required],
      description: ['', Validators.required],
      frescura: ['', Validators.required]
    });
    //Colocar los elementos de la base de datos en el formulario
    if(this.editData){
      this.actionBtn = "Actualizar";
      this.productForm.patchValue(this.editData);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next: (res) => {
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close('agregado');
          },
          error:() => {
            alert("Error adding product");
          }
        });
      }
    }else{
      this.actualizarProducto();
    }
    //console.log(this.productForm.value);
  }
  actualizarProducto(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close('actualizado');
      },
      error:() => {
        alert("Error updating product");
      }
    })
  }
}
