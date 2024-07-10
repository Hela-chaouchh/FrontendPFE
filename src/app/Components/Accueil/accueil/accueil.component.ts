import { Component,OnInit } from '@angular/core';
import { StoreService } from '../../../Services/ServiceStore/store.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ScrollService } from '../scroll.service';
import { ElementRef} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit{

  faCartPlus = faCartPlus;

  constructor(public serviceStore: StoreService,private scrollService: ScrollService, private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.getAllStores();
    this.scrollService.scrollToSection$.subscribe(() => {
      const section = this.elementRef.nativeElement.querySelector('#sectionListeStores');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
    this.scrollService.scrollToCommandeSectionSource$.subscribe(() => {
      const sectionCommande = this.elementRef.nativeElement.querySelector('#sectionCommande');
      if (sectionCommande) {
        sectionCommande.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  getAllStores() {
    this.serviceStore.getAll().subscribe(
      res => {
        this.serviceStore.listeStores = res;
        console.log(res);
      },
      err => {
        console.log('Erreur : ', err);
      }
    );
  }
  cliquer(){
    this.router.navigate(['/commande']);
  }

}
