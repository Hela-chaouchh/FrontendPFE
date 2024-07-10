import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from '../ServiceStore/store.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  isQuantiteValide: boolean = false;
  detailsCommandes: any[] = [];
  panier: any = [
    {
      referenceId: '',
      nom: '',
      quantite: 0,
      prix: 0,
      quantiteACommander: 0,
    }
  ];
  commandeModif: any;

  userId = localStorage.getItem('userId');

  nomProduit: any;
  photoProduit: any;
  afficherProduit: boolean = false;
  private urlCommande = 'http://localhost:8080/api/commande/';

  constructor(private http: HttpClient, public serviceStore: StoreService) { }

  createOrder(commande: any, idStore: any) {
    return this.http.post(this.urlCommande + "addOrder/" + this.userId + "/" + idStore, commande);
  }
  create(commande: any, idStore: any) { //site externe
    return this.http.post(this.urlCommande + "addWithPayload/" + this.userId + "/" + idStore, commande);
  }
  createCommandDifferentStores(commande: any) {
    return this.http.post(this.urlCommande + "addCommandDifferentStores/" + this.userId, commande);
  }

  getAllCommandes() {
    return this.http.get(this.urlCommande);
  }
  deleteCommande(id: any) {
    return this.http.delete(this.urlCommande + "delete/" + id);
  }
  updateCommande(commande: any) {
    return this.http.put(this.urlCommande + "update", commande);
  }
  getCommandeById(id: any) {
    return this.http.get(this.urlCommande + "findById/" + id);
  }

  findcommandesByClient() {
    return this.http.get(this.urlCommande + "findcommandesByClient/" + this.userId)
  }
  nombreCommandes() {
    return this.http.get(this.urlCommande + "nbreCommandes");
  }
  sortCommandes() {
    return this.http.get(this.urlCommande + "sortCommande");
  }
  totalVentes() {
    return this.http.get(this.urlCommande + "totalVentes");
  }
  totalVentesByStore(storeId: any) {
    return this.http.get(this.urlCommande + "totalVentesByStore/" + storeId);
  }
}
