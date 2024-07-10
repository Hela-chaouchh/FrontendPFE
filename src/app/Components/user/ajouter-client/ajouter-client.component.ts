import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastService } from '../../../Services/ServiceToast/toast.service';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { AuthService } from '../../../Services/ServiceAuth/auth.service';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrl: './ajouter-client.component.css'
})
export class AjouterClientComponent {

  faEnvelope = faEnvelope;
  faLock = faLock;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faUser = faUser;
  faUserFriends = faUserFriends;

  client = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
  }
  userExiste: any;
  hidePassword: boolean = true;

  constructor(public serviceAuth: AuthService,private router: Router, public serviceToast: ToastService, public serviceUser: UserService) { }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  findByEmail() {
    this.serviceUser.findByEmail(this.client.email).subscribe(
      res => {
        this.userExiste = res;
        console.log("res" + res);
        this.serviceToast.showInfo("Email existe !");
        if (this.userExiste == null) {
          this.ajouterClient();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  ajouterClient() {
    if (this.formValide()) {
      this.serviceAuth.register(this.client).subscribe(
        (res: any) => {
          this.serviceToast.showSuccess("Success ", "Client ajouté avec succès !");
          console.log(res);
          this.router.navigate(['/listeClients']);
        },
        error => {
          this.serviceToast.showError("Echec d'ajout de client !", "Erreur");
          console.error(error);
        }
      );

    }
    else {
      this.serviceToast.showInfo("Veuillez vérifier tout les champs !");
    }
  }

  formValide(): boolean {
    return (
      !!this.client.nom &&
      !!this.client.prenom &&
      !!this.client.email &&
      !!this.client.password
    );
  }

}
