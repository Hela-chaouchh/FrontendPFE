import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from '../../../Services/ServiceStore/store.service';
import { ProduitService } from '../../../Services/ServiceProduit/produit.service';
import { CommandeService } from '../../../Services/ServiceCommande/commande.service';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { CategorieService } from '../../../Services/ServiceCategorie/categorie.service';
import { ToastService } from '../../../Services/ServiceToast/toast.service';

@Component({
  selector: 'app-liste-p',
  templateUrl: './liste-p.component.html',
  styleUrl: './liste-p.component.css'
})
export class ListePComponent implements OnInit {
  categories: any = [];
  displayedCategories: any[] = [];
  hiddenCategories: any[] = [];
  showMoreButton = false;
  showMenu = false;
  hoveredItem: string | null = null;
  hoveredCard: number | null = null;

  faEdit = faEdit;
  faTrashCan = faTrashCan;
  faCartPlus = faCartPlus;

  produitsByCategorie: any;
  allProduits: any;
  commande = {
    dateCommande: '',
    montant: 0,
    client_id: '',
    detailsCommandes: [{
      produit: {},
      quantite: ''
    }]
  }
  produitACommander = {
    referenceId: '',
    nom: '',
    quantite: 0,
    prix: 0,
  }
  nomStore: any;
  configStore: any;
  logoStore: any;

  activeCategory: string | null = null;

  userId = localStorage.getItem('userId');

  constructor(public serviceStore: StoreService, public serviceProduit: ProduitService, public serviceCommande: CommandeService, public serviceUser: UserService, public serviceCategorie: CategorieService, private elementRef: ElementRef, public serviceToast: ToastService) { }

  async ngOnInit(): Promise<void> {
    this.serviceProduit.produits = null;
    await this.liste(); // Attendre que liste() se termine
    this.getNomLogoStore();
    await this.listeCategories(); // Puis exécuter listeCategories()
    this.loadDetailsFromLocalStorage();
  }


  saveDetailsToLocalStorage(): void {
    localStorage.setItem('detailsCommandes', JSON.stringify(this.serviceCommande.detailsCommandes));
  }
  loadDetailsFromLocalStorage(): void {
    const storedDetails = localStorage.getItem('detailsCommandes');
    if (storedDetails) {
      this.serviceCommande.detailsCommandes = JSON.parse(storedDetails);
    }
  }

  showMoreCategories(): void {
    this.displayedCategories = this.serviceCategorie.categories;
    this.showMoreButton = false;
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  liste(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.activeCategory = null;
      this.serviceStore.getProductsByStore(this.serviceStore.idStore).subscribe(
        res => {
          console.log(res);
          console.log(this.serviceStore.idStore);
          this.serviceProduit.produits = res;
          console.log(res);
          resolve();
        },
        err => {
          this.serviceToast.showError("Echec de récupération de la liste des produits !", "Erreur");
          console.log(err);
          reject(err);
        }
      );
    });
  }


  getNomLogoStore() {
    this.serviceStore.getStoreParId(this.serviceStore.idStore).subscribe(
      res => {
        if ('nom' in res) {
          this.nomStore = res.nom;
        }
        if ('configStore' in res) {
          this.configStore = res.configStore;
          if ('logo' in this.configStore) {
            this.logoStore = this.configStore.logo;
          }
        }
      },
      err => {
        console.error("Erreur: " + err);
      }

    );
  }


  AjouterdetailsCommande(referenceId: any, stock: any, prixUnit: any, nom: string, photo: any) {
    this.serviceProduit.findProductByReferenceIdAndStoreId(referenceId, this.serviceStore.idStore).subscribe(
      (res: any) => {
        if (res) {
          if (stock > 0) {
            this.serviceCommande.isQuantiteValide = true;
            this.serviceCommande.detailsCommandes.push({
              produit: res,
              nom: nom,
              quantite: 1,
              prixUnitaire: prixUnit,
              photo: photo,
              stock: stock,
              client_id: this.userId
            });
            this.saveDetailsToLocalStorage();
            this.serviceToast.showInfo("Produit ajouté au panier !");
          }
          else {
            // this.serviceToast.showInfo("produit hors stock !");
          }

        } else {
          this.serviceToast.showInfo("Produit non trouvé !");
        }
      },
      err => {
        this.serviceToast.showError("echec d'ajout au panier !", "Erreur")
        console.log(err);
      }
    );
  }

  listeCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.serviceCategorie.getAllCategoryByStore(this.serviceStore.idStore).subscribe(
        res => {
          console.log(res);
          console.log(this.serviceStore.idStore);
          this.serviceCategorie.categories = res;
          this.displayedCategories = this.serviceCategorie.categories.slice(0, 7);
          if (this.serviceCategorie.categories.length > 7) {
            this.showMoreButton = true;
            this.hiddenCategories = this.serviceCategorie.categories.slice(7);
          }
          console.log(res);
          resolve();
        },
        err => {
          this.serviceToast.showError("Echec de récupération de la liste des categories !", "Erreur");
          console.log(err);
          reject(err);
        }
      );
    });
  }

  listeProduitsByCategories(categorie: any) {
    this.showMenu = false;
    this.activeCategory = categorie;
    this.allProduits = this.serviceProduit.produits;
    this.serviceCategorie.getProduitsByCategories(categorie, this.serviceStore.idStore).subscribe(
      res => {
        this.serviceProduit.produits = res;
      },
      err => {
        this.serviceToast.showError("Echec de récupération de la liste des produits !", "Erreur");
        console.error(err);
      }
    );
  }
}
