import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faTurnDown } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from '../../../Services/ServiceStore/store.service';
import { ConfigStoreAttributsService } from '../../../Services/ServiceConfigStoreAttributs/config-store-attributs.service';
import { ToastService } from '../../../Services/ServiceToast/toast.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-modif-store',
  templateUrl: './modif-store.component.html',
  styleUrl: './modif-store.component.css'
})
export class ModifStoreComponent {
  faPlus = faPlus;
  faUpDown = faTurnDown;
  showAlert: boolean = false;
  boutonClique: boolean = false;
  showStoreConfig = false;
  showApi = false;
  showSessionUser = false;
  isEditingPassword: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  oldPassword: string = '';
  isPasswordCorrect: boolean = false;
  hashedPassword: any;

  toggleEditPassword() {
    this.isEditingPassword = !this.isEditingPassword;
  }

  constructor(public serviceStore: StoreService, private router: Router, private ngZone: NgZone, public serviceConfigAttribut: ConfigStoreAttributsService, public serviceToast: ToastService) {

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


  modif() {
    this.boutonClique = true;
    if (
      this.serviceStore.storeModif.nom &&
      this.serviceStore.storeModif.configStore.url &&
      this.serviceStore.storeModif.configStore.typeRemise &&
      this.serviceStore.storeModif.configStore.typeAutorisationApiGetProduct &&
      this.serviceStore.storeModif.configStore.typeResponseApiGetProduct) {

      if (this.newPassword != "") {
        if (this.newPassword !== this.confirmPassword) {
          this.serviceToast.showError("this.newPassword !== this.confirmPassword", "Erreur");
          return;
        }

        if (this.isPasswordCorrect == false) {
          this.serviceToast.showError("this.oldPassword !== this.user.password", "Erreur");

          // Affichez un message d'erreur si l'ancien mot de passe ne correspond pas
          return;
        }

        // Hachez le nouveau mot de passe avant de le mettre à jour dans l'objet user
        this.serviceStore.storeModif.configStore.password = bcrypt.hashSync(this.newPassword, 10);

      }
      this.serviceStore.updateStore(this.serviceStore.storeModif)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/liste']);
            this.serviceToast.showSuccess('Store modifié avec succès!', '');
            /*  this.ngZone.run(() => {
                this.showAlert = true;
                this.router.navigate(['/liste']);
              });*/
          },
          err => {
            console.error(err);
          }
        );

    } else {
      console.log("Veuillez remplir tous les champs requis.");
    }

  }
  crypterPassword() {
    // Hashage du mot de passe
    this.hashedPassword = bcrypt.hashSync(this.oldPassword, 10); // Le deuxième argument est le coût de hachage, ici 10 est une valeur commune

    console.log("hashedPassword" + this.hashedPassword);
    console.log("this.oldPassword" + this.oldPassword);
    // Comparaison du mot de passe haché avec celui stocké dans user.password
    this.isPasswordCorrect = bcrypt.compareSync(this.oldPassword, this.serviceStore.storeModif.configStore.password);
    console.log(this.isPasswordCorrect);
  }

  ajouterAttribut() {
    this.serviceStore.storeModif.configStore.configStoreAttributs.push({
      attributeKey: '',
      attributeValue: '',
      chemin: ''
    });
  }

  retirerAttribut(index: number, idAttribut: any) {
    this.serviceStore.storeModif.configStore.configStoreAttributs.splice(index, 1);
    this.serviceConfigAttribut.deleteAttribut(idAttribut);
  }


  formValide(): boolean {
    return (
      !!this.serviceStore.storeModif.nom &&
      !!this.serviceStore.storeModif.configStore.url
    );
  }
}
