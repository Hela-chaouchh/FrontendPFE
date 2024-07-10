import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from '../../Services/ServiceStore/store.service';
import { ProduitService } from '../../Services/ServiceProduit/produit.service';
import { UserService } from '../../Services/ServiceUser/user.service';
import { ToastService } from '../../Services/ServiceToast/toast.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  faSearch = faSearch;
  faCartShopping = faCartShopping;
  faUserCircle = faUserCircle;
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  nomStore: any;
  store: any;
  userId = localStorage.getItem('userId');
  user : any;
  value: any;

  constructor(public serviceStore: StoreService, public serviceProduit: ProduitService,public serviceUser : UserService, public router: Router,public serviceToast:ToastService) { }

  ngOnInit(): void {
    if(this.serviceStore.idStore){
      this.nomStoree(this.serviceStore.idStore);
    }
    this.getUserById(this.userId);
    
  }

  isStoreRoute(): boolean {
    return this.router.url === '/liste' || this.router.url === '/ajout' || this.router.url === '/listeProd' || this.router.url === '/modif';
  }

  isListeProdRoute(): boolean {
    return this.router.url === '/listeProd';
  }
  afficherFormSearch(): boolean {
    return this.router.url === '/listeProd' || this.router.url === '/liste' || this.router.url === '/listeClients';
  }
  isCommandeRoute(): boolean {
    return this.router.url === '/listeCmd' || this.router.url === '/commande' || this.router.url === '/detailsCmd';
  }
  isCategoriesRoute(): boolean {
    return this.router.url === '/categoriesByStore';
  }

  nomStoree(id: any) {
    this.serviceStore.getStoreParId(id)
      .subscribe(
        res => {
          this.store = res;
        },
        err => {
          console.log(err);
        }
      )
  }
 

  getUserById(id : any){
    this.serviceUser.getUserById(this.userId).subscribe(
      res => {
        this.user = res;
      },
      err => {
        console.error('Error', err);
      }
    );
  }

  filter(value: string) {
    if (this.router.url === "/liste") {
      if (value === "") {
        this.serviceStore.getAll().subscribe(
          res => {
            this.serviceStore.listeStores = res;
          }
        );
      }
      else {
        this.serviceStore.filterStoresByName(value).subscribe(
          res => {
            this.serviceStore.listeStores = res;
          },
          err => {
            console.log("Erreur" + err);
          }
        );
      }
    }
    else if (this.router.url === "/listeProd") {
      if (value === "") {
        this.serviceStore.getProductsByStore(this.serviceStore.idStore).subscribe(
          res => {
            this.serviceProduit.produits = res;
          }
        );
      }
      else {
        this.serviceStore.filterProduit(value).subscribe(
          res => {
            this.serviceProduit.produits = res;
          },
          err => {
            console.log("Erreur" + err);
          }
        );
      }
    }
    else if (this.router.url === "/listeClients") {
      if (value === "") {
        this.serviceUser.getUsers().subscribe(
          res => {
            this.serviceUser.users = res;
          }
        );
      }
      else {
        console.log("prenom: ",value);
        this.serviceUser.filterUser(value).subscribe(
          res => {
            this.serviceUser.users = res;
            console.log("users: "+ this.serviceUser.users);
          },
          err => {
            console.log("Erreur" + err);
          }
        );
      }
    }
  }

  modifProfil() {
    this.router.navigate(['/profil']);
  }

}
