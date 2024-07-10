import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../Services/ServiceCommande/commande.service';
import { ProduitService } from '../../../Services/ServiceProduit/produit.service';
import { faPlus, faTrash, faArrowLeft,faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/ServiceUser/user.service';

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.component.html',
  styleUrl: './details-commande.component.css'
})
export class DetailsCommandeComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  faEye = faEye;
  nomsDesProduits: string[] = [];
  produit: any;


  constructor(public serviceCommande: CommandeService, public serviceProduit: ProduitService, public router: Router,public serviceUser:UserService) { }
  ngOnInit(): void {
  
  }

  afficheProduit(referenceId: any, storeId: any) {
    this.serviceProduit.getProduitByRefId(referenceId, storeId).subscribe(
      (res: any) => {
        this.serviceCommande.nomProduit  = res.name;
        this.serviceCommande.photoProduit = res.photo;
        this.serviceCommande.afficherProduit = true;
        console.log("nomProduit : "+this.serviceCommande.nomProduit);
        console.log("photoProduit :"+this.serviceCommande.photoProduit);
      },
      err => {
        console.error(err);
      }
    );
  }




}
