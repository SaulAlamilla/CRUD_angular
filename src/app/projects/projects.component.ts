import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { DialogProjectComponent } from '../dialog-project/dialog-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = [
    "nombre",
    "descripcion",
    "encargado",
    "area",
    "actions"
  ];
  projects !: MatTableDataSource<any>;
  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this.api.getProjects().subscribe({
      next:(value) => {
        this.projects = new MatTableDataSource(value);
      },
      error:(err) => {
        alert("Error getting products");
      }
    });
  }

  editProject(project: any){
    this.dialog.open(
      DialogProjectComponent,
      {
        width: '30%',
        data: project
      }
    ).afterClosed().subscribe(result => {//Para actualizar la tabla
        if(result == 'updated'){
          this.getProjects();
        }
      }
    );
  }

  deleteProject(id: number){
    this.api.deleteProject(id).subscribe(
      {
        next: (res) => {
          alert("Project deleted sucessfully");
          this.getProjects();
        },
        error:() => {
          alert("Error deleting project");
        }
      }
    );
  }
}
