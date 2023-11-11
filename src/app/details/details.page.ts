import { Component, OnInit, Input } from '@angular/core';
import { Calls, DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() id: string;
  call: Calls= null;

  constructor(private dataService: DataService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.dataService.getCallById(this.id).subscribe(res=> {
      this.call= res;
    });
  }

  async updateCall()
  {
    this.dataService.updateCall(this.call);
  }

  async deleteCall()
  {
    this.dataService.deleteCall(this.call);
    this.modalCtrl.dismiss();
  }

}
