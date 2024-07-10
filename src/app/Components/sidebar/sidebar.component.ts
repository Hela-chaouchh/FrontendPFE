import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../Services/ServiceUser/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  faCoffee = faCoffee;
  faHome = faHome;
  faStore = faStore;
  faUser = faUser;
  faList = faList;
  faCartPlus = faCartPlus;
  faShop = faBagShopping;
  faSignOut = faSignOut;
  faShoppingBag = faShoppingBag;
  faBook = faBook;
  faArrowLeft = faArrowLeft;

  show : boolean = true;

  constructor(public serviceUser:UserService){}

  showLogo(){
    this.show = !this.show;
  }

}
