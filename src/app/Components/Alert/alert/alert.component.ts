import { Component, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string,contenu: string }) {}

}
