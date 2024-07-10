import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  createurCommande: any;

  constructor(public userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.getCreateur(this.userService.createurId);
  }
  getCreateur(id : any) {
    this.userService.getUserById(id).subscribe(
      res => {
        this.createurCommande = res;
        console.log("createur : ", this.createurCommande);
      },
      err => {
        console.log(err);
      }
    )
  }
  back(){
    this.router.navigate(['/listeCmd']);
  }
}
