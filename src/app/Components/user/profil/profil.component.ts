import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../Services/ServiceToast/toast.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  userId:any;
  user:any = null;
  isEditingPassword: boolean = false;
  newPassword: string = ''; 
  confirmPassword: string = '';
  oldPassword: string = '';

  showModifProfil:boolean = false;
  isEditing : boolean = false;
  isPasswordCorrect:boolean = false;
  hashedPassword : any;
  
  constructor(public serviceUser: UserService, private router: Router, public serviceToast:ToastService) { }

  ngOnInit(): void {
    this.serviceUser.userRole = localStorage.getItem("role");
    this.userId = localStorage.getItem("userId");
    this.getUser();
  }

  toggleEditPassword() {
    this.isEditingPassword = !this.isEditingPassword;
  }
  
  cancelEditPassword() {
    this.isEditingPassword = false;
  }

  getUser() {
    this.serviceUser.getUserById(this.userId).subscribe(
      (res: any) => {
        this.user = {
          id:res.id,
          nom: res.nom,
          prenom: res.prenom,
          email: res.email,
          password: res.password,
          role: res.role
        };
      },
      (err) => {
        console.error(err);
      }
    );
  }

  modifier() {
    this.isEditing = !this.isEditing;
  }

  crypterPassword(){
      // Hashage du mot de passe
  this.hashedPassword = bcrypt.hashSync(this.oldPassword, 10); // Le deuxième argument est le coût de hachage, ici 10 est une valeur commune

  console.log("hashedPassword"+this.hashedPassword);
  console.log("this.oldPassword"+this.oldPassword);
  // Comparaison du mot de passe haché avec celui stocké dans user.password
  this.isPasswordCorrect = bcrypt.compareSync(this.oldPassword, this.user.password);
  console.log(this.isPasswordCorrect);
  }
  
  saveChanges() {
    this.isEditing = false;
    if(this.newPassword != ""){
      if (this.newPassword !== this.confirmPassword) {
        this.serviceToast.showError("this.newPassword !== this.confirmPassword","Erreur");
        return;
      }
    
      if (this.isPasswordCorrect == false) {
        this.serviceToast.showError("this.oldPassword !== this.user.password","Erreur");

        // Affichez un message d'erreur si l'ancien mot de passe ne correspond pas
        return;
      }
    
      // Hachez le nouveau mot de passe avant de le mettre à jour dans l'objet user
      this.user.password = bcrypt.hashSync(this.newPassword, 10);
    
    }
      
    this.serviceUser.updateClient(this.user).subscribe(
      res => {
        this.router.navigate(['/profil']);
        this.serviceToast.showSuccess("Votre profil a bien été modifié !","");
      },
      err => {
        console.error(err);
        this.serviceToast.showError("Echec de modification de client !","Erreur");
      }
    );
  }
}
