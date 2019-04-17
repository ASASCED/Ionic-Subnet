import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosSubnetService, Neting } from '../../service/datos-subnet.service';
import { PopoverController } from '@ionic/angular';
import { PageinfoComponent } from '../../components/pageinfo/pageinfo.component';

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

  sumHost: number = 0;
  slashCap: number = 2;

  constructor(
    private _router: Router,
    private _datosSubnet: DatosSubnetService,
    private _popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  async mostrarPop() {
    const popover = await this._popoverCtrl.create({
      component: PageinfoComponent,
    });
    await popover.present();
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

    for (let i = 0; i < this.hosts.length; i++) {
      this.subis.push(host[i].value);
    }

    this.slash = ip[4].value;

    this.subis.sort(this.deMenorAMayor);
    this._datosSubnet.setNet(this.ips, this.subis, this.slash);

    if (this.sumariVLSM()) {
      this._router.navigate(['/subnet']);
    } else {
      this.mostrarPop();
    }
  }

  sumariVLSM(): boolean {
    for (let i = 0; i < this.subis.length; i++) {
      this.sumHost = this.sumHost + (+this.subis[i]);
    }

    for (let i = 0; i < (30 - this.slash); i++) {
      this.slashCap += this.slashCap + 2;
    }

    console.log(this.slashCap);
    console.log(this.sumHost);

    if (this.comVLSM()) {
      return false;
    } else {
      return true;
    }

  }

  comVLSM(): boolean {
    if (this.sumHost > this.slashCap) {
      console.log('No se puede realizar el subneteo');
      return true;
    } else {
      return false;
    }
  }

  deMenorAMayor(elem1, elem2) {
    return elem1 - elem2;
  }

}
