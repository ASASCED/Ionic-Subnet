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

  ips: number[] = [];
  subis: number[] = [];
  slash: number;
  reqHost: number;
  finalSlash: number = 0;

  sumHost: number = 0;
  slashCap: number = 2;
  comp: boolean;

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
      backdropDismiss: false
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();

    console.log(data);
    this.finalSlash = data.slash;
    console.log(this.finalSlash);
  }

  addHost() {
    this.hosts.push(`input${this.numero++}`);
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

    this.subis.sort(this.deMayorAMenor);

    this.comp = this.sumariVLSM();

    this._datosSubnet.setNet(this.ips, this.subis, this.slash);

    if (this.comp) {
      this._router.navigate(['/subnet']);
    } else {
      this.mostrarPop();
    }
  }

  sumariVLSM(): boolean {
    this.sumHost = 0;
    this.slashCap = 0;

    for (let i = 0; i < this.subis.length; i++) {
      this.sumHost += (+this.subis[i]);
    }

    for (let i = 0; i < (31 - this.slash); i++) {
      this.slashCap += this.slashCap + 2;
    }

    // FIXME: Arreglar el bug que permite el paso hacia la pantalla de subneteo sin llenar algun campo principal o sin algun host de por medio.

    if (this.sumHost > this.slashCap) {
      return false;
    } else {
      return true;
    }

    // TODO: Añadir nuevas funciones de diagonal en caso de error.
  }

  deMayorAMenor(elem1, elem2) {
    return elem2 - elem1;
  }

  eliminarHost( idx: number ) {
    this.hosts.splice(idx, 1);
  }

}
