import { Component } from '@angular/core';
import { CommandeService } from '../../../Services/ServiceCommande/commande.service';

@Component({
  selector: 'app-afficher-produit',
  templateUrl: './afficher-produit.component.html',
  styleUrl: './afficher-produit.component.css'
})
export class AfficherProduitComponent {
  constructor(public serviceCommande: CommandeService) { }

  close() {
    this.serviceCommande.afficherProduit = !this.serviceCommande.afficherProduit;
  }
}
