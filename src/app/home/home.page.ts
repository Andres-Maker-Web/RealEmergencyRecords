import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

const IMAGE_DIR= 'stored-images';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  calls= [];


  constructor(private dataService: DataService, private alertCrl: AlertController, 
    private modalCtrl: ModalController)
    {
      this.dataService.getCalls().subscribe(res=> {
        this.calls= res;
      });
    }


    async details(call: any)
    {
      const modal= this.modalCtrl.create({
        component: DetailsPage,
        componentProps: {id: call.id},
        breakpoints: [0, 0.5, 0.8],
        initialBreakpoint: 0.5
      });
      (await modal).present();
    }

    async addNewCall()
    {
      //const image = await this.selectImage();
      const alert= await this.alertCrl.create({
        header: 'Agregue los datos de la llamada',
        inputs: [
          {name: 'Titulo', type: 'text'},
          {name: 'Descripcion', type: 'text'},
          {name: 'Imagen', type: 'text'},
          {name: 'Fecha', placeholder: 'yyyy-mm-dd', type: 'date'}
        ],
        buttons: [
          {text: 'Cancelar', role: 'cancel'},
          {text: 'Agregar', handler: (res)=> {this.dataService.addCall({title: res.Titulo,
          description: res.Descripcion, image: res.Imagen, date: res.Fecha});}}
        ]
      });
      await alert.present();
    }

}
