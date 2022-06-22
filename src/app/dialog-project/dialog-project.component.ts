import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-project',
  templateUrl: './dialog-project.component.html',
  styleUrls: ['./dialog-project.component.css']
})
export class DialogProjectComponent implements OnInit {
  projectForm !: FormGroup;
  actionBtn : string = "Guardar";

  constructor(
    private FormBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogProjectComponent>) { }

  ngOnInit(): void {
    this.projectForm = this.FormBuilder.group(
      {
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        encargado: ['', Validators.required],
        area: ['', Validators.required]
      }
    );

    if(this.editData){
      this.actionBtn = "Actualizar";
      this.projectForm.patchValue(this.editData);
    }
  }

  addProject(){
    if(!this.editData){
      if(this.projectForm.valid){
        this.api.postStudent(this.projectForm.value)
        .subscribe({
          next: (res) => {
            alert("Product added successfully");
            this.projectForm.reset();
            this.dialogRef.close('agregado');
          },
          error:() => {
            alert("Error adding product");
          }
        });
      }
    }else{
      this.updateProject();
    }
  }

  updateProject() {
    this.api.putProject(this.projectForm.value,this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Product updated successfully");
        this.projectForm.reset();
        this.dialogRef.close('updated');
      },
      error:() => {
        alert("Error updating product");
      }
    })
  }

}
