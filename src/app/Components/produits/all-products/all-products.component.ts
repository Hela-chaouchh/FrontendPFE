import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ProduitService } from '../../../Services/ServiceProduit/produit.service';
import { CommandeService } from '../../../Services/ServiceCommande/commande.service';
import { StoreService } from '../../../Services/ServiceStore/store.service';
import { CategorieService } from '../../../Services/ServiceCategorie/categorie.service';
import { ToastService } from '../../../Services/ServiceToast/toast.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  constructor(public serviceProduit: ProduitService,public serviceCommande: CommandeService,public serviceStore: StoreService, private router: Router,public serviceCategorie: CategorieService, private elementRef: ElementRef, public serviceToast:ToastService) { }
  faEdit = faEdit;
  faTrashCan = faTrashCan;
  faCartPlus = faCartPlus;

  stores: any;
  produits: any;
  selectedStore: any;
  storeSelectionIsValid: boolean = false;

  categories: any = [];
  displayedCategories: any[] = [];
  hiddenCategories: any[] = [];
  showMoreButton = false;
  showMenu = false;

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

  hoveredItem: string | null = null;

  ngOnInit(): void {
    this.produits = null;
    this.listeStores();
    this.loadDetailsFromLocalStorage();
  }

  
  storeValide(): void {
    this.storeSelectionIsValid = !!this.selectedStore; // Met à jour storeSelectionIsValid en fonction de la validité du champ "Store"
  }

  listeStores() {
    this.serviceStore.getAll().subscribe(
      res => {
        this.stores = res;
        console.log('liste des stores', this.stores);
      },
      err => {
        console.error(err);
        this.serviceToast.showError("Echec de récupération de la liste des store !","Erreur");
      }
    );
  }

  listeProduitByStore() {
    if (this.selectedStore) {
      console.log("id  store", this.selectedStore.id);
      this.serviceStore.getProductsByStore(this.selectedStore.id).subscribe(
        res => {
          this.produits = res;
          console.log('Produits du Store sélectionné : ', this.produits);
        },
        err => {
          this.serviceToast.showError("Echec de récupération des produits !","Erreur");
          console.error(err);
        }
      );
    }
    else{
      this.serviceToast.showInfo("Veuillez sélectionner un store !");
    }
  }

  showMoreCategories(): void {
    this.displayedCategories = this.serviceCategorie.categories;
    this.showMoreButton = false;
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  getNomLogoStore() {
    this.serviceStore.getStoreParId(this.selectedStore.id).subscribe(
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
  loadDetailsFromLocalStorage(): void {
    const storedDetails = localStorage.getItem('detailsCommandes');
    if (storedDetails) {
      this.serviceCommande.detailsCommandes = JSON.parse(storedDetails);
    }
  }
  saveDetailsToLocalStorage(): void {
    localStorage.setItem('detailsCommandes', JSON.stringify(this.serviceCommande.detailsCommandes));
  }
  userId = localStorage.getItem('userId');
  AjouterdetailsCommande(referenceId: any, stock: any, prixUnit: any, nom: string, photo: any) {
    this.serviceProduit.findProductByReferenceIdAndStoreId(referenceId, this.selectedStore.id).subscribe(
      (res: any) => {
        if (res) {
          if (stock > 0) {
            this.serviceCommande.isQuantiteValide = true;
            this.serviceCommande.detailsCommandes.push({
              produit: res,
              nom: nom,
              quantite: null,
              prixUnitaire: prixUnit,
              photo: photo,
              stock: stock,
              client_id: this.userId
            });
            this.saveDetailsToLocalStorage();
            this.serviceToast.showInfo("Produit ajouté au panier !");
          }
          else {
            this.serviceToast.showInfo("produit hors stock !");
          }

        } else {
          this.serviceToast.showInfo("Produit non trouvé !");
        }
      },
      err => {
        this.serviceToast.showError("echec d'ajout au panier !","Erreur")
        console.log(err);
      }
    );
  }


  listeCategories() {
    this.serviceCategorie.getAllCategoryByStore(this.selectedStore.id).subscribe(
      res => {
        console.log(res);
        console.log(this.selectedStore.id);
        this.serviceCategorie.categories = res;
        this.displayedCategories = this.serviceCategorie.categories.slice(0, 7);
        if (this.serviceCategorie.categories.length > 7) {
          this.showMoreButton = true;
          this.hiddenCategories = this.serviceCategorie.categories.slice(7);
        }
        console.log(res);
      },
      err => {
        this.serviceToast.showError("Echec de récupération de la liste des catégories !","Erreur");
        console.log(err);
      }
    );
  }

  listeProduitsByCategories(categorie: any) {
    this.showMenu = false;
    this.serviceCategorie.getProduitsByCategories(categorie, this.selectedStore.id).subscribe(
      res => {
        this.produits = res;
      },
      err => {
        this.serviceToast.showError("Echec de récupération des produits !","Erreur");
        console.error(err);
      }
    );
  }
}
