import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private selectedItem: any;
  private icons = [
    'cloud-upload',
    'photos',
    'document',
  ];
  public items: Array<{author: string; note: string; icon: string; date: string }> = [];
  constructor(public alertCtrl: AlertController) {
      this.items.push({
        author: 'Hai caricato un documento',
        note: 'Contratto di Lavoro.pdf',
        icon: this.icons[0],
        date: '11/11 19:12'
      });
      this.items.push({
        author: 'Hai caricato una immagine',
        note: 'FotoTesserino.jpg',
        icon: this.icons[0],
        date: '11/11 14:45'

      });
      this.items.push({
        author: 'Marco dal Backoffice',
        note: 'Contratto di Lavoro da compilare.pdf',
        icon: this.icons[2],
        date: '09/11 09:21'
      });
      this.items.push({
        author: 'Marco dal Backoffice',
        note: 'Fac-Simile foto tesserino.jpg',
        icon: this.icons[1],
        date: '09/11 09:14'
      });
      this.items.push({
        author: 'Anita dal Backoffice',
        note: 'Guida generale Banca Sella.pdf',
        icon: this.icons[2],
        date: '08/11 11:11'
      });
      this.items.push({
        author: 'Anita dal Backoffice',
        note: 'Documento di benvenuto.png',
        icon: this.icons[1],
        date: '08/11 11:10'
      });
      this.items.push({
        author: 'Anita dal Backoffice',
        note: 'Richiesta di assunzione.pdf',
        icon: this.icons[2],
        date: '08/11 10:13'
      });
  }
  async doConfirmDocument() {
    const confirm = this.alertCtrl.create({
      message: 'Sei sicuro di voler caricare il file?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'SI',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    (await confirm).present();
  }

  async doConfirmPhoto() {
    const confirm = this.alertCtrl.create({
      message: 'Sei sicuro di voler caricare la foto?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'SI',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    (await confirm).present();
  }
}

