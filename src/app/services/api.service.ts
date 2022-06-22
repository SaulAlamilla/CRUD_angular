import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private STUDENTURL = 'http://localhost:3000/students/';
  private PROJECTURL = 'http://localhost:3000/projects/';

  constructor(private http : HttpClient) { }

  postStudent(data: any){
    return this.http.post<any>(this.STUDENTURL, data);
  }
  getStudents(){
    return this.http.get<any>(this.STUDENTURL);
  }
  putStudent(data: any, id: number){
    return this.http.put<any>(this.STUDENTURL+id, data);
  }
  deleteStudent(id: number){
    return this.http.delete<any>(this.STUDENTURL+id);
  }



  //Projects
  getProjects(){
    return this.http.get<any>(this.PROJECTURL);
  }


  putProject(data: any, id: number){
    return this.http.put<any>(this.PROJECTURL+id, data);
  }

  deleteProject(id: number){
    return this.http.delete<any>(this.PROJECTURL+id);
  }
}
