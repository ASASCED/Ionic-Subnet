import { Component, OnInit } from '@angular/core';
import { DatosSubnetService, Neting } from '../../service/datos-subnet.service';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.page.html',
  styleUrls: ['./subnet.page.scss'],
})
export class SubnetPage implements OnInit {

  HostJSON: Neting;

  constructor(private _datosSubnet: DatosSubnetService) {
    this.HostJSON = Object.assign({}, this._datosSubnet.getNet());
  }

  ngOnInit() {
  }

  limpiar() {
    console.log('Net limpio');
    this._datosSubnet.clearNet();
  }

}
