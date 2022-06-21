import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CRUD_angular';
  displayedColumns: string[] = ['nombres', 'paterno', 'materno', 'numcontrol', 'proyecto', 'actions'];
  dataSource !: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    //this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(result => {//Para actualizar la tabla
      if(result == 'agregado'){
        //this.getAllProducts();
      }
    });
  }

  /*
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(value) => {
        this.dataSource = new MatTableDataSource(value);
        //console.log(value);
      },
      error:(err) => {
        alert("Error getting products");
      }
    })
  }
  editProduct(element: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(result => {//Para actualizar la tabla
      if(result == 'actualizado'){
        this.getAllProducts();
      }
    });
  }
  deleteProduct(id : number){
    this.api.deleteProduct(id)
    .subscribe({
      next: (res) => {
        alert("Product deleted successfully");
        this.getAllProducts();
      },
      error:() => {
        alert("Error deleting product");
      }
    })
  }
*/

}
