import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  createurId : any;
  userRole : any;
  userAmodifier ={
    id:"",
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: ""
  };

  users:any;
  
  private url = 'http://localhost:8081/api/client/';

  constructor(private http: HttpClient, private router:Router) { }
  isUser(): boolean{
    this.userRole = localStorage.getItem("role");
    return this.userRole === "USER";
  }
  isAdmin(): boolean{
    this.userRole = localStorage.getItem("role");
    return this.userRole === "ADMIN";
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
  getAll() {
    return this.http.get(this.url);
  }
  getUsers() {
    return this.http.get(this.url + "users");
  }
  getUserById(idUser : any){
    return this.http.get(this.url + "findClientById/" + idUser);
  }

  findByEmail(email: string){
    return this.http.get(this.url + "findByEmail/" + email);
  }
  nbreClients(){
    return this.http.get(this.url + "nbreClients");
  }

  updateClient(client: any){
    return this.http.put(this.url + "update",client);
  }

  deleteClient(idClient:any){
    return this.http.delete(this.url + "delete/" +idClient);
  }
  ajoutClient(client:any){
    return this.http.post(this.url + "add",client);
  }
  filterUser(prenom:string){
    return this.http.get(this.url + "filter/" + prenom);
  }
}
