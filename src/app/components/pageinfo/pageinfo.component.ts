import { Component, OnInit } from '@angular/core';
import { DatosSubnetService, Neting } from '../../service/datos-subnet.service';

@Component ({
  selector: 'app-pageinfo',
  templateUrl: './pageinfo.component.html',
  styleUrls: ['./pageinfo.component.scss'],
})
export class PageinfoComponent implements OnInit {

  HostJSON: Neting;
  slash: number = 2;

  constructor(private _datosSubnet: DatosSubnetService) {
    this.HostJSON = Object.assign({}, this._datosSubnet.getNet());

    for (let i = 0; i < (30 - this.HostJSON.slash); i++) {
      this.slash += this.slash + 2;
      console.log(this.slash);
    }
  }

  ngOnInit() {}

  onClick() {
    console.log('Popover Cerrado');
  }

}
