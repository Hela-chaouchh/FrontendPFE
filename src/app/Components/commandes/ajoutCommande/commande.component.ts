import { Component, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from '../../../Services/ServiceStore/store.service';
import { CommandeService } from '../../../Services/ServiceCommande/commande.service';
import { ProduitService } from '../../../Services/ServiceProduit/produit.service';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { ToastService } from '../../../Services/ServiceToast/toast.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit {
  faCartPlus = faCartPlus;

  detailsCommandes: any[] = [];

  commande = {
    dateCommande: '',
    montant: '',
    detailsCommandes: this.detailsCommandes
  }

  selectedStore: any;
  selectedProduit: any;
  produits: any;
  stores: any;
  quantiteProduit: any;
  quantiteACommander: any;
  storeSelectionIsValid: boolean = false;
  isQuantiteValide: boolean = false;
  commandeAjouteeAvecSucces: boolean = false;
  
  ngOnInit(): void {
    this.serviceUser.userRole = localStorage.getItem("role");
    this.listeStores();
  }
  constructor(public serviceCommande: CommandeService, public serviceStore: StoreService, public serviceProduit: ProduitService, public serviceUser: UserService, private router: Router,public serviceToast:ToastService) { }

  storeValide(): void {
    this.storeSelectionIsValid = !!this.selectedStore; 
  }

  listeStores() {
    this.serviceStore.getAll().subscribe(
      res => {
        this.stores = res;
        console.log('liste des stores', this.stores);
      },
      err => {
        console.error(err);
      }
    );
  }

  listeProduitByStore(idStore: any) {
    if (idStore) {
      console.log("id  store", idStore);
      this.serviceStore.getProductsByStore(idStore).subscribe(
        res => {
          this.produits = res;
          console.log('Produits du Store sélectionné : ', this.produits);
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  quantityByProduit() {
    this.quantiteProduit = this.selectedProduit.quantite;
   /* if (referenceId) {
      console.log("referenceId Produit ", referenceId);
      this.serviceProduit.getQuantityByProduit(referenceId,this.selectedStore.id).subscribe(
        res => {
          this.quantiteProduit = res;
          console.log("Quantité par produit : " + this.quantiteProduit);
        },
        err => {
          console.error(err);
        }
      );
    }*/
  }


  AjoutCmd() {
    if (!(this.selectedStore == null)) {
      if (this.isQuantiteValide && this.detailsCommandes.length > 0) { // Vérifier si des produits sont sélectionnés
        this.commande.detailsCommandes = this.detailsCommandes;
        console.log("commande :" + this.commande);
        this.serviceCommande.create(this.commande, this.selectedStore.id)
          .subscribe(
            res => {
              this.serviceToast.showSuccess("commande ajouté avec succès !","Success")
              console.log("Commande créée :", res);
              // Réinitialiser la commande et les produits sélectionnés
              this.commande = {
                dateCommande: '',
                montant: '',
                detailsCommandes: []
              };
              this.detailsCommandes = [];
              this.router.navigate(["/listeCmd"]);
            },
            err => {
              this.serviceToast.showError("Echec de l'ajout !","Erreur")
              console.error("Erreur lors de la création de la commande :", err);
            }
          );
      } else {
        this.serviceToast.showInfo("Veuillez sélectionner au moins un produit !");
      }
    } else {
      this.serviceToast.showInfo('Veuillez sélectionner un store!');
    }
  }

  AjouterdetailsCommande(referenceId: any, quantiteACommander: string, prixUnit: any, nom: string) {
    if (this.selectedProduit) {
      const quantite = parseInt(quantiteACommander, 10); // Convertir la quantité en nombre entier
      if (!isNaN(quantite) && quantite > 0 && quantite < this.quantiteProduit) { // Vérifier si la quantité est un nombre valide
        this.serviceProduit.findProductByReferenceIdAndStoreId(referenceId, this.selectedStore.id).subscribe(
          (res: any) => {
            if (res) {
              this.isQuantiteValide = true;
              this.detailsCommandes.push({
                produit: res,
                nom: nom,
                quantite: quantite,
                prixUnitaire: prixUnit
              });
              this.commandeAjouteeAvecSucces = true;
              this.quantiteProduit = null;
              this.selectedProduit = null; // Réinitialiser le produit sélectionné
              this.quantiteACommander = null; // Réinitialiser la quantité à commander
            } else {
              console.error();
              this.commandeAjouteeAvecSucces = false;
            }
          },
          err => {
            this.serviceToast.showInfo("Produit non trouvé!");
            console.log(err);
            this.commandeAjouteeAvecSucces = false;
          }
        );
      } else {
        this.serviceToast.showInfo("Veuillez saisir une quantité valide!");
        this.commandeAjouteeAvecSucces = false;
      }
    }
    
  }

  suivant(tabGroup: MatTabGroup) {
    tabGroup.selectedIndex = 1; // Sélectionne le deuxième onglet
  }


  supprimerLigne(index: number) {
    this.detailsCommandes.splice(index, 1);
  }


}
