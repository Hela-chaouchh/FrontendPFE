import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastService } from '../../../Services/ServiceToast/toast.service';

@Component({
  selector: 'app-liste-clients',
  templateUrl: './liste-clients.component.html',
  styleUrl: './liste-clients.component.css'
})


export class ListeClientsComponent implements OnInit{
  
  clients: any = []; // Array to hold all commands
  pagedItems: any[] = []; // Items for the current page
  currentPage = 1; // Current page
  itemsPerPage = 5; // Items per page

  User ={
    id: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: ''
  }
  nbreClients: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public serviceUser: UserService, private router: Router,public serviceToast:ToastService) {}
  
  ngOnInit(): void {
    this.ListeUsers();
    this.getNbreClients();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex + 1; // Adjust current page based on paginator's page index
      this.loadPage();
    });
  }

  loadPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedItems = this.serviceUser.users.slice(startIndex, startIndex + this.itemsPerPage);
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadPage();
  }

  ListeUsers() {
    this.serviceUser.getUsers().subscribe(
      res => {
        this.serviceUser.users = res;
        this.loadPage();
      },
      err => {
        console.error(err);
      }
    );
  }

  getNbreClients(){
    this.serviceUser.nbreClients().subscribe(
      res => {
        this.nbreClients = res;
      },
      err => {
        console.error(err);
      }
    );
  }
  
  modifier(id:any){
    this.router.navigate(['/modifierClient']);
    this.serviceUser.getUserById(id).subscribe(
      (res:any)  => {
        if (res && res.id && res.nom && res.prenom && res.email && res.password && res.role) {
        this.serviceUser.userAmodifier.id = res.id;
        this.serviceUser.userAmodifier.nom = res.nom;
        this.serviceUser.userAmodifier.prenom = res.prenom;
        this.serviceUser.userAmodifier.email = res.email;
        this.serviceUser.userAmodifier.password = res.password;
        this.serviceUser.userAmodifier.role = res.role;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
