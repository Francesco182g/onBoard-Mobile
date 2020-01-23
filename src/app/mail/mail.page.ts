import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {

  userEmail: string;

  public mail: FormGroup;

  problem: boolean;

  constructor(private emailComposer: EmailComposer, private authService: AuthenticationService,
              private formBuilder: FormBuilder, private alertCtrl: AlertController) {

                // Mail validator
                this.mail = this.formBuilder.group({
                  target: ['', Validators.required],
                  object: [''],
                  mess: [''],
                });
                this.userEmail = this.authService.userDetails().email;
                this.problem = true;
   }

  logForm() {
    console.log(this.mail.value);
  }

  ngOnInit() {
  }

  sendEmail() {
    console.log(this.mail.value.mess);
    const email = {
      to: this.mail.value.target,
      cc: this.userEmail,
      subject: this.mail.value.object,
      body: 'Messaggio da ' + this.userEmail + ' ' + this.mail.value.mess,
     // html: 'Messaggio da ' + this.userEmail + ' ' + this.mail.value.mess,
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  async showAnnounce(nome, descrizione) {
    const alert = await this.alertCtrl.create({
      header: nome,
      message: descrizione,
      buttons: ['Conferma']
    });
    alert.present();
  }
}
