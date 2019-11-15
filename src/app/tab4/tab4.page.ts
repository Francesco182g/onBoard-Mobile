import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  private selectedItem: any;
  private icons = [
    'mail-unread',
    'notifications',
    'alert',
    'document',
    'mail-unread',
    'calendar',
    'clock',
    'cloud-upload',
    'photos',
    'happy',
  ];
  public items: Array<{author: string; note: string; icon: string; date: string }> = [];
  constructor() {
      this.items.push({
        author: 'Colloquio sede Banca Sella',
        note: 'Hai ricevuto un avviso per il colloquio di Lunedì 18/11 ore 9.30',
        icon: this.icons[2],
        date: '11/11 19:12'
      });
      this.items.push({
        author: 'Evento festa in azienda',
        note: 'In occasione delle feste natalizie il 10/12 dalle ore 9.00 alle 12.00 ci sarà la festa di Natale',
        icon: this.icons[5],
        date: '11/11 14:45'

      });
      this.items.push({
        author: 'Marco dal Backoffice ti ha inviato una foto',
        note: 'Fac-Simile foto tesserino.jpg',
        icon: this.icons[8],
        date: '09/11 09:14'
      });
      this.items.push({
        author: 'Anita dal Backoffice ti ha inviato un documento',
        note: 'Guida generale Banca Sella.pdf',
        icon: this.icons[3],
        date: '08/11 11:11'
      });
      this.items.push({
        author: 'Anita dal Backoffice',
        note: 'Benvenuto a bordo, nella sezione Documenti troverai tutti i documenti da scaricare e firmare',
        icon: this.icons[3],
        date: '08/11 11:10'
      });
      this.items.push({
        author: 'Benvenuto InSella',
        note: 'Scopri tutte le funzionalità della nostra applicazione',
        icon: this.icons[9],
        date: '08/11 10:13'
      });
  }
}
