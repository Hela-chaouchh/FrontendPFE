import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from '../../../Services/ServiceStore/store.service';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../../Services/ServiceToast/toast.service';

//import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-liste-s',
  templateUrl: './liste-s.component.html',
  styleUrl: './liste-s.component.css',
  /*
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
  */
})
export class ListeSComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faList = faList;
  faListOl = faLayerGroup;
  faBars = faBars;
  faListCheck = faListCheck;
  stores: any;
  showActionButton: number = -1;
  afficherAlerte: boolean = false;
  indiceSuppression: number | null = null;

  constructor(public serviceStore: StoreService, public serviceUser: UserService, private router: Router, private serviceToast:ToastService) { }

  ngOnInit(): void {
    this.serviceUser.userRole = localStorage.getItem("role");
    this.ListeStores();
  }

  ListeStores() {
    this.serviceStore.getAll().subscribe(
      res => {
        console.log(res);
        this.serviceStore.listeStores = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  cliquer(id: any) {
    this.router.navigate(['/modif']);
    this.serviceStore.getStoreParId(id).subscribe(
      res => {
        this.serviceStore.storeModif = res;
      },
      err => {
        console.log(err);
      }
    )

  }

  afficherConfirmationSuppression(index: number) {
    console.log("indiceSuppression : " + this.indiceSuppression);
    this.indiceSuppression = index; // Enregistrer l'indice de l'élément à supprimer
    this.afficherAlerte = true;
    console.log("indiceSuppression : " + this.indiceSuppression);
  }

  confirmerSuppression() {
    console.log("confirmerSuppression ---indiceSuppression : " + this.indiceSuppression);
    if (this.indiceSuppression !== null) {
      const item = this.serviceStore.listeStores[this.indiceSuppression]; // Obtenir l'élément à supprimer
      this.supprimer(item.id, this.indiceSuppression); // Appeler la fonction de suppression avec l'ID et l'indice correct
      this.serviceToast.showInfo("store supprimé avec succès !");
      this.indiceSuppression = null; // Réinitialiser l'indice de suppression
      this.afficherAlerte = false
    }
  }

  supprimer(id: any, index: number) {
    this.serviceStore.listeStores.splice(index, 1);
    this.serviceStore.deleteStore(id)
      .subscribe(
        res => {
          console.log(res);
          this.ListeStores();
        },
        err => {
          console.log(err);
        }
      );
  }

  listeProd(id: any) {
    this.router.navigate(['/listeProd']);
    this.serviceStore.idStore = id;
    console.log("id" + id);

  }

  listeProdUser(id: any) {
    if (this.serviceUser.isUser()) {
      this.router.navigate(['/listeProd']);
      this.serviceStore.idStore = id;
      console.log("id" + id);
    }
  }
  
  listeCategories(id: any) {
    this.router.navigate(['/categoriesByStore']);
    this.serviceStore.idStore = id;
    console.log("id" + id);
  }

}
