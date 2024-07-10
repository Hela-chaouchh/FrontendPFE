import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/ServiceAuth/auth.service';
import { UserService } from '../../Services/ServiceUser/user.service';
import { ToastService } from '../../Services/ServiceToast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  User = {
    email: '',
    password: '',
  }
  userId: any;
  user: any;
  
  hidePassword: boolean = true;

  constructor(public serviceAuth: AuthService, public serviceUser: UserService, private router: Router, public serviceToast:ToastService) { }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  signIn() {
    if(this.formValide()){
      this.serviceAuth.login(this.User).subscribe(
        (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token); 
          }
          if (res.userId) {
            localStorage.setItem('userId', res.userId); 
            this.userId = res.userId; 
            this.getUserById(this.userId);
          }
        },
        error => {
          this.serviceToast.showError("Echec de connexion !","Erreur");
          console.error('Erreur lors de la connexion :', error);
        }
      );
    }
    else{
      this.serviceToast.showInfo("Veuillez vérifier tout les champs !");
    }
    
  
  }
  
  getUserById(id: any) {
    this.serviceUser.getUserById(id).subscribe(
      (res: any) => {
        this.user = res;
        if (this.user && this.user.role) {
          localStorage.setItem('role', this.user.role); 
          if (this.user.role === "USER") {
            this.router.navigate(['/accueil']);
          } else if (this.user.role === "ADMIN") {
            this.router.navigate(['/accueilAdmin']);
          } else {
            console.error('Rôle utilisateur non géré :', this.user.role);
          }
          this.serviceToast.showSuccess("Vous êtes maintenant connecté !", `Bienvenue ${this.user.nom} ${this.user.prenom}`);

        } else {
          console.error('Impossible de récupérer le rôle de l\'utilisateur.');
          // Gérer le cas où le rôle de l'utilisateur est manquant
        }
      },
      err => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', err);
        // Gérer l'erreur ici, par exemple, afficher un message d'erreur à l'utilisateur
      }
    );
  }
  formValide(): boolean {
    return (
      !!this.User.email &&
      !!this.User.password
    );
  }

}
