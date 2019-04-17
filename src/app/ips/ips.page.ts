import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosSubnetService, Neting } from '../service/datos-subnet.service';

@Component({
  selector: 'app-ips',
  templateUrl: './ips.page.html',
  styleUrls: ['./ips.page.scss'],
})
export class IpsPage implements OnInit {

  hosts: string[] = [];
  ip: string[] = [];
  numero = 0;
  HostJSON: Neting;

  ips: number[] = [];
  subis: number[] = [];
  slash: number;

  constructor(private _router: Router, private _datosSubnet: DatosSubnetService) { }

  ngOnInit() {
  }

  addHost() {
    this.hosts.push(`input${this.numero++}`);
    console.log(this.hosts);
  }

  calcularVLSM() {
    const host: any = document.getElementsByClassName('hostCount');
    const ip: any = document.getElementsByClassName('ip');

    for (let i = 0; i < 4; i++) {
      this.ips.push(ip[i].value);
    }

    this.slash = ip[4].value;

    for (let i = 0; i < this.hosts.length; i++) {
      this.subis.push(host[i].value);
    }

    this.subis.sort(this.deMenorAMayor);

    this._datosSubnet.setNet(this.ips, this.subis, this.slash);

    this._router.navigate(['/subnet']);
  }

  deMenorAMayor(elem1, elem2) {
    return elem1 - elem2;
  }

}
