import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface MyData {
  name: string;
  descrizione: string;
  user: string;
  filepath: string;
  size: number;
  date: string;
  approval: number;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
// Upload Code

  // Upload Task
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  // Uploaded Image List
  images: Observable<MyData[]>;

  // File details
  fileName: string;
  fileSize: number;
  date: string = new Date().toISOString();
  approval: number;
  descrizione: string;
  user: string;

  // Status check
  isUploading: boolean;
  isUploaded: boolean;

  private imageCollection: AngularFirestoreCollection<MyData>;

  constructor(public alertCtrl: AlertController, private storage: AngularFireStorage, private database: AngularFirestore) {
                this.isUploading = false;
                this.isUploaded = false;
                console.log();
                // Set collection where our documents/ images info will save
                this.imageCollection = database.collection<MyData>('testcollect');
                this.images = this.imageCollection.valueChanges();
  }
  /*
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
*/
  uploadFile(event: FileList) {


    // The File object
    const file = event.item(0);

    /* Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
     console.error('unsupported file type :( ');
     return;
    }
*/
    this.isUploading = true;
    this.isUploaded = false;

    // Boolean Flag pre approval Document
    this.approval = 1;

    // File Name
    this.fileName = file.name;

    this.user = '';

    // The storage path
    const path = `testcollect/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'testcollect Upload Demo' };

    // File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();

        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            name: file.name,
            descrizione: this.descrizione,
            user: this.user,
            filepath: resp,
            size: this.fileSize,
            date: this.date,
            approval: this.approval
          });
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        });
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    );
  }


  addImagetoDB(image: MyData) {
    // Create an ID for document
    const id = this.database.createId();
    this.descrizione = 'giuseppe';
    // Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error ' + error);
    });
  }
}

