import { Component, OnInit } from '@angular/core';
import { DatosSubnetService, Neting } from '../../service/datos-subnet.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pageinfo',
  templateUrl: './pageinfo.component.html',
  styleUrls: ['./pageinfo.component.scss'],
})
export class PageinfoComponent implements OnInit {

  HostSAVE: Neting;
  slash: number = 2;
  prubeSlash: number = 2;
  limHostArr: number[] = [];
  limHost: number = 0;
  utilSlash: number[] = [];
  diagonale: number = 30;

  finalSlash: number;

  constructor(
    private _datosSubnet: DatosSubnetService,
    private _popoverCtrl: PopoverController
    ) {
    this.HostSAVE = Object.assign({}, this._datosSubnet.getNet());

    for (let i = 0; i < (30 - this.HostSAVE.slash); i++) {
      this.slash += this.slash + 2;
    }

    for (let i = 0; i < this.HostSAVE.hosts.length; i++) {
      this.limHostArr.push(this.HostSAVE.hosts[i]);
    }

    for (let i = 0; i < this.HostSAVE.hosts.length; i++) {
      this.limHost = this.limHost + +this.limHostArr[i];
    }

    this.prubeSlash = this.slash;
    this.diagonale = this.HostSAVE.slash - 1;

    for (let i = 1; i < (30 - (30 - this.HostSAVE.slash)); i++) {
      this.prubeSlash += this.prubeSlash + 2;

      if (this.prubeSlash > this.limHost) {
        this.utilSlash.push(this.diagonale);
      }

      this.diagonale--;
    }
  }

  ngOnInit() { }

  onClick() {
    this._datosSubnet.clearNet();
    this._popoverCtrl.dismiss({
      slash: this.finalSlash
    });
  }

  valueSelect() {
    this.finalSlash = Number((<HTMLInputElement>document.getElementById('slash')).value);
    console.log(`Item: ${this.finalSlash}`);
  }

}
