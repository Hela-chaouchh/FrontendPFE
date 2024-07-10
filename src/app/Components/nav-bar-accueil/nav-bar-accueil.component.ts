import { Component, ElementRef, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faFileClipboard } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../Services/ServiceUser/user.service';
import { StoreService } from '../../Services/ServiceStore/store.service';
import { HostListener } from '@angular/core';
import { ScrollService } from '../Accueil/scroll.service';
import { Router } from '@angular/router';
import { ProduitService } from '../../Services/ServiceProduit/produit.service';

@Component({
  selector: 'app-nav-bar-accueil',
  templateUrl: './nav-bar-accueil.component.html',
  styleUrl: './nav-bar-accueil.component.css'
})
export class NavBarAccueilComponent implements OnInit {

  faClipboardList = faFileClipboard;
  activeLink: string = '';
  faUserCircle = faUserCircle;
  faSearch = faSearch;
  faCartShopping = faCartArrowDown;
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  userId = localStorage.getItem('userId');
  user: any;
  value: any;
  isScrolled: boolean = false;
  
  constructor(public serviceUser: UserService, public serviceStore: StoreService, private elementRef: ElementRef, private scrollService: ScrollService, private router: Router,public serviceProduit:ProduitService) { }
  ngOnInit(): void {
    this.getUserById(this.userId);
    this.setActiveLink();

  }
  scrollToSection() {
    this.scrollService.triggerScrollToSection();
  }

  scrollToCommandeSection() {
    this.scrollService.triggerScrollToCommandeSection();
  }

  listeStores() {
    if (this.router.url === '/accueil') {
      this.scrollToSection();
    }
    else {
      this.router.navigate(['/liste']);
    }
  }
  ajoutCommande() {
    if (this.router.url === '/accueil') {
      this.scrollToCommandeSection();
    }
    else {
      this.router.navigate(['/commande']);
    }
  }

  setActiveLink() {
    const currentUrl = this.router.url; // Obtenir l'URL courante
    if (currentUrl === '/liste') {
      this.activeLink = 'liste'; // Définir l'état actif du lien en fonction de l'URL courante
    } else if (currentUrl === '/commande') {
      this.activeLink = 'commande';
    } else {
      this.activeLink = ''; // Aucun lien actif
    }
  }

  getUserById(id: any) {
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
  }

  modifProfil() {
    this.router.navigate(['/profil']);
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 50;
  }

  clickLogo() {
    this.router.navigate(["/accueil"]);
  }

  isAccueilPage(): boolean {
    return this.router.url === "/accueil";
  }
  isCommandePage(): boolean {
    return this.router.url === "/commande" || this.router.url === "/listeCmd";
  }
  afficherFormRecherche() {
    return this.router.url === "/liste" || this.router.url === "/listeProd"
  }
  isListeStoresPage() {
    return this.router.url === "/liste";
  }
}
