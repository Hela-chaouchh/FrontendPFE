import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToSectionSource = new Subject<void>();
  private scrollToCommandeSectionSource = new Subject<void>();

  scrollToSection$ = this.scrollToSectionSource.asObservable();
  scrollToCommandeSectionSource$ = this.scrollToCommandeSectionSource.asObservable();

  triggerScrollToSection() {
    this.scrollToSectionSource.next();
  }

  triggerScrollToCommandeSection() {
    this.scrollToCommandeSectionSource.next();
  }
}
