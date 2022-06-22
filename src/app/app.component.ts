import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { StudentsComponent } from './students/students.component';

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

  }

}
