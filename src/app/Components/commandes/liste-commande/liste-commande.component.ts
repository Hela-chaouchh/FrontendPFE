import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faTrash, faUser, faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { CommandeService } from '../../../Services/ServiceCommande/commande.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastService } from '../../../Services/ServiceToast/toast.service';

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.css']
})
export class ListeCommandeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  faEye = faEye;
  faTrash = faTrash;
  faUser = faUser;
  faList = faList;

  nombreCommandes:any;

  commandes: any = []; // Array to hold all commands
  pagedItems: any[] = []; // Items for the current page
  currentPage = 1; // Current page
  itemsPerPage = 5; // Items per page

  constructor(public serviceCommande: CommandeService, public serviceUser: UserService, private router: Router,public serviceToast:ToastService) {}

  ngOnInit(): void {
    this.getCommandeParUser();
    this.getNombreCommande();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex + 1; // Adjust current page based on paginator's page index
      this.loadPage();
    });
  }

  loadPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedItems = this.commandes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadPage();
  }

  ListeCmd() {
    this.serviceCommande.getAllCommandes().subscribe(
      res => {
        this.commandes = res;
        this.loadPage();
      },
      err => {
        console.error(err);
      }
    );
  }

  ListeCommandesParClients() {
    this.serviceCommande.findcommandesByClient().subscribe(
      res => {
        this.commandes = res;
        this.loadPage();
      },
      err => {
        console.error(err);
      }
    );
  }

  supprimerCmd(id: any, index: number) {
    this.commandes.splice(index, 1);
    this.serviceCommande.deleteCommande(id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  modif(id: any) {
    this.router.navigate(['/detailsCmd']);
    this.serviceCommande.getCommandeById(id).subscribe(
      res => {
        this.serviceCommande.commandeModif = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getCreateurId(id: any) {
    this.router.navigate(['/userInfo']);
    this.serviceUser.createurId = id;
    console.log('idCreateur: ', this.serviceUser.createurId);
  }

  getCommandeParUser() {
    if (this.serviceUser.isAdmin()) {
      this.ListeCmd();
    }
    if (this.serviceUser.isUser()) {
      this.ListeCommandesParClients();
    }
  }
  getNombreCommande(){
    this.serviceCommande.nombreCommandes().subscribe(
      res => {
        this.nombreCommandes = res;
      }
    );
  }
 
}