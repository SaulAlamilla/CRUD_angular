import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['nombres', 'paterno', 'materno', 'numcontrol', 'proyecto', 'actions'];
  students !: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ApiService) {

  }

  ngOnInit(): void {
    this.getStudents();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(result => {//Para actualizar la tabla
      if(result == 'agregado'){
        this.getStudents();
      }
    });
  }

  getStudents() {
    this.api.getStudents()
    .subscribe({
      next:(value) => {
        this.students = new MatTableDataSource(value);
        //console.log(value);
      },
      error:(err) => {
        alert("Error getting products");
      }
    })
  }

  deleteStudent(id:number){
    this.api.deleteStudent(id)
    .subscribe({
      next: (res) => {
        alert("Product deleted successfully");
        this.getStudents();
      },
      error:() => {
        alert("Error deleting product");
      }
    })
  }

  editStudent(element: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(result => {//Para actualizar la tabla
      if(result == 'actualizado'){
        this.getStudents();
      }
    });
  }

}
