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

  productForm !: FormGroup;
  actionBtn : string = "Guardar";

  projectSelect ?: Array<any>

  constructor(private FormBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      nombres: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      numcontrol: ['', Validators.required],
      project: ['', Validators.required],
    });
    //Colocar los elementos de la base de datos en el formulario
    if(this.editData){
      this.actionBtn = "Actualizar";
      this.productForm.patchValue(this.editData);
    }
    this.getProjects()
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postStudent(this.productForm.value)
        .subscribe({
          next: (res) => {
            alert("Student added successfully");
            this.productForm.reset();
            this.dialogRef.close('agregado');
          },
          error:() => {
            alert("Error adding student");
          }
        });
      }
    }else{
      this.actualizarProducto();
    }
  }
  actualizarProducto(){
    this.api.putStudent(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Student updated successfully");
        this.productForm.reset();
        this.dialogRef.close('actualizado');
      },
      error:() => {
        alert("Error updating student");
      }
    })
  }

  getProjects(){
    this.api.getProjects().subscribe({
      next:(value) => {
        this.projectSelect = value
      },
      error:(err) => {
        alert("Error getting projects");
      }
    });
  }
}
