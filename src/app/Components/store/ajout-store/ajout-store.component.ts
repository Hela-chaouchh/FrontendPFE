import { Attribute, Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from '../../../Services/ServiceStore/store.service';
import { ConfigStoreAttributsService } from '../../../Services/ServiceConfigStoreAttributs/config-store-attributs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../Alert/alert/alert.component';
import { Router } from '@angular/router';
import { ToastService } from '../../../Services/ServiceToast/toast.service';

@Component({
  selector: 'app-ajout-store',
  templateUrl: './ajout-store.component.html',
  styleUrl: './ajout-store.component.css'
})
export class AjoutStoreComponent implements OnInit {
  isLinear = false;
  showStoreConfig = false;
  showApi = false;
  showSessionUser = false;
  typePageable = false;
  faPlus = faPlus;
  faTrash = faTrash;

  store = {
    nom: '',
    archived: 1,
    configStore: {
      url: '',
      cheminListProduit: '',
      typeResponseApiGetProduct: '',
      paramsApiPaginable:'',
      typeAutorisationApiGetProduit: false,
      apiaddCommande: '',
      versQuantity: '',
      versPrice: '',
      cheminImage: '',
      apiLogin: '',
      email: '',
      password: '',
      cheminToken: '',
      typeBodyLogin: null,
      cheminCategorie: '',
      typeRemise: '',
      ApiGetUser: '',
      logo: '',
      payload: '',
      urlPhoto: '',
      configStoreAttributs: [
        {
          attributeKey: '',
          attributeValue: '',
          chemin: '',
          configMethode: ''
        }
      ]
    }
  }

  nomStoreIsValid : boolean = false;
  configStoreIsValid : boolean = false;
  configAttributsStoreIsValid : boolean = false;
  attributsGet: any;
  afficherAlerte: boolean = false;
  showInputs: boolean = false;
  boutonClique: boolean = false;
  attributsPost: any;
  paramsApiPageable: any;
  
  constructor(public serviceConfigAttributs: ConfigStoreAttributsService, public serviceStore: StoreService, private _formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, public serviceToast: ToastService) {}
  
  ngOnInit(): void {
    this.ajouterAttributGet();
    this.ajouterAttributPost();
  }

  nomStoreValide(): void {
    this.nomStoreIsValid = !!this.store.nom; 
  }
  configStoreValide(): void {
    this.configStoreIsValid = !!this.store.configStore.url && !!this.store.configStore.typeAutorisationApiGetProduit && !!this.store.configStore.typeResponseApiGetProduct ; 
  }
  configAttributsStoreValide(): void {
    this.configAttributsStoreIsValid = !!this.store.nom; 
  }
  showStoreConfigAttributs() {
    this.showStoreConfig = !this.showStoreConfig;
  }
  showStoreApis() {
    this.showApi = !this.showApi;
  }
  showSession() {
    this.showSessionUser = !this.showSessionUser;
  }

  showAttributsTypePageable() {
    this.typePageable = !this.typePageable;
  }


  afficherAlert() {
    this.afficherAlerte = true;
  }

  ajout() {
    this.boutonClique = true;

    // Vérifier si tous les champs requis sont valides
    if (
      this.store.nom &&
      this.store.configStore.url &&
      this.store.configStore.typeRemise &&
      this.store.configStore.typeAutorisationApiGetProduit &&
      this.store.configStore.typeResponseApiGetProduct) {

      console.log(this.store);
      this.serviceStore.createNewStore(this.store)
        .subscribe(
          res => {
            this.serviceToast.showSuccess('Success', 'Store ajouté avec succès !')
            console.log('Réponse du serveur :', res);
            this.router.navigate(['/liste']);
            this.store = {
              nom: '',
              archived:1,
              configStore: {
                url: '',
                cheminListProduit: '',
                typeResponseApiGetProduct: '',
                paramsApiPaginable:'',
                typeAutorisationApiGetProduit: false,
                apiaddCommande: '',
                versQuantity: '',
                versPrice: '',
                cheminImage: '',
                apiLogin: '',
                email: '',
                password: '',
                cheminToken: '',
                typeBodyLogin: null,
                cheminCategorie: '',
                typeRemise: '',
                ApiGetUser: '',
                logo: '',
                payload: '',
                urlPhoto: '',
                configStoreAttributs: []
              }
            }
          },
          error => {
            this.serviceToast.showError("Echec de l'ajout !", "Erreur");
            console.error('Erreur lors de l\'ajout :', error);
          }
        );
    } else {
      this.serviceToast.showInfo("Veuillez remplir tous les champs requis !")
      console.log("Veuillez remplir tous les champs requis.");
    }
  }

  formValide(): boolean {
    return (
      !!this.store.nom &&
      !!this.store.configStore.url &&
      !!this.store.configStore.typeRemise &&
      !!this.store.configStore.typeAutorisationApiGetProduit &&
      !!this.store.configStore.typeResponseApiGetProduct
    );
  }

  retirerAttribut(index: number) {
    this.store.configStore.configStoreAttributs.splice(index, 1);
  }

  ajouterAttributGet() {
    this.serviceConfigAttributs.getKeysGet().subscribe(
      res => {
        this.attributsGet = res;
        console.log("attributsGet :", this.attributsGet);
        this.showInputs = true;
        if (this.store.configStore.configStoreAttributs.length > 0) {
          this.store.configStore.configStoreAttributs.shift();
        }
        for (let a of this.attributsGet) {
          this.store.configStore.configStoreAttributs.push({
            attributeKey: a,
            attributeValue: '',
            chemin: '',
            configMethode: 'GET'
          });
        }
      },
      err => {
        console.error(err)
      }
    );
  }

  ajouterAttributPost() {
    this.serviceConfigAttributs.getKeysPost().subscribe(
      res => {
        this.attributsPost = res;
        console.log("attributsPost :", this.attributsPost);
        this.showInputs = true;
        for (let a of this.attributsPost) {
          this.store.configStore.configStoreAttributs.push({
            attributeKey: a,
            attributeValue: '',
            chemin: '',
            configMethode: 'POST'
          });
        }
      },
      err => {
        console.error(err)
      }
    );
  }

  ajouterAttributParamsApiPageable() {
    if(this.store.configStore.typeResponseApiGetProduct === 'Pageable'){
      this.serviceConfigAttributs.getKeyParamsApiPageable().subscribe(
        res => {
          this.paramsApiPageable = res;
          console.log("paramsApiPageable :", this.paramsApiPageable);
          this.showInputs = true;
          for (let a of this.paramsApiPageable) {
            this.store.configStore.configStoreAttributs.push({
              attributeKey: a,
              attributeValue: '',
              chemin: '',
              configMethode: 'ParamsGet'
            });
          }
        },
        err => {
          console.error(err)
        }
      );
    }
  }

}
