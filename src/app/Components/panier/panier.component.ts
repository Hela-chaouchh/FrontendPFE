import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ProduitService } from '../../Services/ServiceProduit/produit.service';
import { CommandeService } from '../../Services/ServiceCommande/commande.service';
import { StoreService } from '../../Services/ServiceStore/store.service';
import { UserService } from '../../Services/ServiceUser/user.service';
import { catchError, lastValueFrom, of, tap } from 'rxjs';
import { ToastService } from '../../Services/ServiceToast/toast.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {

  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  faHashtag = faChartBar;
  faCartPlus = faCartPlus;
  userId : any;
  prod: any;
  stock: number[] = [];
  commande = {
    dateCommande: '',
    montant: '',
    detailsCommandes: this.serviceCommande.detailsCommandes
  }

  constructor(public serviceProduit: ProduitService, public serviceCommande: CommandeService, public serviceStore: StoreService, private router: Router, public serviceUser: UserService, private serviceToast:ToastService) { }
  async ngOnInit(): Promise<void> {
    this.userId = localStorage.getItem('userId');
    this.getElementsPanierByClient();
    console.log("this.serviceCommande.detailsCommandes "+this.serviceCommande.detailsCommandes);
    await this.getStockProduits(); // Attendre la fin de l'exécution de getStockProduits
    
  }

  loadDetailsFromLocalStorage(): void {
    const details = localStorage.getItem('detailsCommandes');
    if (details) {
      this.serviceCommande.detailsCommandes = JSON.parse(details);
    }
  }

  saveDetailsToLocalStorage(): void {
    localStorage.setItem('detailsCommandes', JSON.stringify(this.serviceCommande.detailsCommandes));
  }

  getElementsPanierByClient() {
    this.loadDetailsFromLocalStorage();
    this.serviceCommande.detailsCommandes = this.serviceCommande.detailsCommandes.filter(elem => {
      return elem.client_id === this.userId;
    });
    console.log('Filtered panier:', this.serviceCommande.detailsCommandes);
  }
  
  

  async getQuantityByProd(referenceId: any, storeId: any): Promise<number> {
    try {
      const res = await lastValueFrom(this.serviceProduit.getQuantityByProduit(referenceId, storeId).pipe(
        catchError(err => {
          console.log(err);
          return of(0);
        })
      ));
      return typeof res === 'number' ? res : 0;
    } catch (error) {
      console.error('Error fetching quantity:', error);
      return 0;
    }
  }


  async getStockProduits(): Promise<void> {
    const stockPromises = this.serviceCommande.detailsCommandes.map(async (elem, index) => {
      try {
        if (elem.produit?.referenceId && elem.produit?.store?.id) {
          const quantity = await this.getQuantityByProd(elem.produit.referenceId, elem.produit.store.id);
          this.stock[index] = quantity;
        } else {
          console.error(`Missing referenceId or store id for element at index ${index}`);
        }
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    });

    await Promise.all(stockPromises);
  }

  verifierProduitHorsStock() {
    this.serviceCommande.isQuantiteValide = true;
    console.log("stock :" + this.stock)
    for (const elem of this.stock) {
      if (elem < 0) {
        this.serviceCommande.isQuantiteValide = false;
        break;
      }
    }
  }


  isQuantityACommanderValid(): boolean {
    for (const item of this.serviceCommande.detailsCommandes) {
      if (item.quantite < 1 || item.quantite > this.stock[this.serviceCommande.detailsCommandes.indexOf(item)]) {
        return false;
      }
    }
    return true;
  }
  
  AjoutCmd() {
    if (this.serviceCommande.detailsCommandes.length > 0) {
      this.verifierProduitHorsStock();
      if (this.serviceCommande.isQuantiteValide) {
        if(this.isQuantityACommanderValid()){
        this.commande.detailsCommandes = this.serviceCommande.detailsCommandes;
        this.serviceCommande.createCommandDifferentStores(this.commande)
          .subscribe(
            res => {
              this.serviceToast.showSuccess("Commande ajouté avec succès !", "Success");
              console.log("Commande créée :", res);
              // Réinitialiser la commande et les produits sélectionnés
              this.commande = {
                dateCommande: '',
                montant: '',
                detailsCommandes: []
              };
              this.loadDetailsFromLocalStorage();
              for (const elem of this.serviceCommande.detailsCommandes) {
                if (elem.client_id === this.userId) {
                  this.serviceCommande.detailsCommandes.splice(this.serviceCommande.detailsCommandes.indexOf(elem), 1);
                }
              }
              this.saveDetailsToLocalStorage();
              this.router.navigate(["/listeCmd"]);
            },
            err => {
              this.serviceToast.showError("Erreur lors de la création de la commande !", "Erreur");
              console.error("Erreur lors de la création de la commande :", err);
            }
          );
        }else{
          this.serviceToast.showInfo("Quantité à commander invalide");
        }
      } else {
        this.serviceToast.showInfo("produit horsStock !");
      }
    } else {
      this.serviceToast.showInfo("Veuillez choisir au moins un produit !");
    }
  }

  supprimerLigne(index: number) {
    this.serviceCommande.detailsCommandes.splice(index, 1);
    this.saveDetailsToLocalStorage();
  }
}

