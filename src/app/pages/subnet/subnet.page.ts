import { Component, OnInit } from '@angular/core';
import { DatosSubnetService, Neting } from '../../service/datos-subnet.service';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.page.html',
  styleUrls: ['./subnet.page.scss'],
})
export class SubnetPage implements OnInit {

  HostJSON: Neting;
  conSubNet: Port[] = [{
    ip: '',
    pu: '',
    uu: '',
    bc: '',
    mm: '',
    host: '',
    reqHost: ''
  }];

  hostFinal: number = 0;

  arrayTemp: number[] = [];
  arraySum: number[] = [];

  masc: number[] = [255, 255, 255, 255];

  octOne: number = 0;
  octTwo: number = 0;
  octThree: number = 0;
  octFour: number = 0;

  com: number = 0;
  count: number = 0;
  hostReq: number = 0;

  limOctFirst: number = 0;
  limOctSecond: number = 0;
  limOctThird: number = 0;

  conThir: number = 0;
  aux: number = 0;

  sumHost: number = 0;
  continue: boolean = true;
  rele: boolean = true;

  constructor(private _datosSubnet: DatosSubnetService) {
    this.HostJSON = Object.assign({}, this._datosSubnet.getNet());

    for (let i = 0; i < this.HostJSON.ip.length; i++) {
      this.arrayTemp.push(this.HostJSON.ip[i]);
    }

    this.octOne = +this.arrayTemp[0];
    this.octTwo = +this.arrayTemp[1];
    this.octThree = +this.arrayTemp[2];
    this.octFour = +this.arrayTemp[3];

    this.subNetComplete();
  }

  ngOnInit() {
  }

  limpiar() {
    this._datosSubnet.clearNet();
  }

  subNetComplete() {
    for (let z = 0; z < this.HostJSON.hosts.length; z++) {
      // COMPROBACIÓN DE TERCER OCTETO

      for (let i = 0; i < 31; i++) {
        this.conThir += 8;
        if (this.octTwo >= this.conThir) {
          this.aux = this.conThir;
        }
      }

      this.octTwo = this.aux;

      console.log(`IP de inicio: ${this.octOne} . ${this.octTwo} . ${this.octThree} . ${this.octFour}`);
      console.log(`Primera Utilizable: ${this.octOne} . ${this.octTwo} . ${this.octThree} . ${this.octFour + 1}`);
      this.conSubNet[z].ip = this.octOne + ' . ' + this.octTwo + ' . ' + this.octThree + ' . ' + this.octFour;
      this.conSubNet[z].pu = this.octOne + ' . ' + this.octTwo + ' . ' + this.octThree + ' . ' + (this.octFour + 1);

      for (let i = 0; i < this.HostJSON.hosts.length; i++) {
        this.arraySum.push(this.HostJSON.hosts[i]);
      }

      for (let i = 0; i < this.HostJSON.hosts.length; i++) {
        this.sumHost = this.sumHost + +this.arraySum[i];
      }

      // HOST REQUERIDOS PARA LA RED

      for (let i = 0; i < 31; i++) {
        this.count += this.count + 2;
        if (this.count >= this.sumHost) {
          this.com = this.count;
          break;
        }
      }

      this.hostReq = this.com;
      this.conSubNet[z].reqHost = String(this.hostReq);
      this.conSubNet[z].host = String(this.HostJSON.hosts[z]);

      //  CALCULO DE SECTORES

      if (this.sumHost >= this.HostJSON.hosts[z]) {
        for (let i = 0; i < 7; i++) {
          this.limOctFirst += this.limOctFirst + 2;
          if (this.limOctFirst >= this.HostJSON.hosts[z]) {
            this.octFour = this.limOctFirst + 1;
            this.continue = false;
            this.masc[3] = this.masc[3] - this.octFour;
            break;
          } else if (i >= 6) {
            this.octFour = 255;
            this.masc[3] = this.masc[3] - this.octFour;
          }
        }
      }

      if (this.sumHost >= this.HostJSON.hosts[z] && this.continue === true) {
        for (let i = 0; i < 7; i++) {
          if (this.limOctFirst >= this.HostJSON.hosts[z]) {
            this.octThree = this.limOctSecond;
            this.continue = false;
            this.masc[2] = this.masc[2] - this.octThree;
            break;
          } else if (i >= 6) {
            this.octThree = 255;
            this.masc[2] = this.masc[2] - this.octThree;
          }
          this.limOctFirst += this.limOctFirst + 2;
          this.limOctSecond += this.limOctSecond + 1;
        }
      }

      if (this.sumHost >= this.HostJSON.hosts[z] && this.continue === true) {
        for (let i = 0; i < 7; i++) {
          this.limOctFirst += this.limOctFirst + 2;
          if (this.limOctFirst >= this.HostJSON.hosts[z]) {
            this.octTwo += this.limOctThird;
            this.continue = false;
            this.masc[1] = this.masc[1] - this.limOctThird;
            break;
          } else if (i >= 6) {
            this.octTwo = 255;
            this.masc[1] = this.masc[1] - this.octTwo;
          }
          this.limOctThird += this.limOctThird + 1;
        }
      }

      console.log(`Ultima Utilizable: ${this.octOne} . ${this.octTwo} . ${this.octThree} . ${this.octFour - 1}`);
      console.log(`Broadcast: ${this.octOne} . ${this.octTwo} . ${this.octThree} . ${this.octFour}`);
      this.conSubNet[z].uu = this.octOne + ' . ' + this.octTwo + ' . ' + this.octThree + ' . ' + (this.octFour - 1);
      this.conSubNet[z].bc = this.octOne + ' . ' + this.octTwo + ' . ' + this.octThree + ' . ' + this.octFour;
      this.conSubNet[z].mm = String(this.masc[0] + ' . ' + this.masc[1] + ' . ' + this.masc[2] + ' . ' + this.masc[3]);
    }
  }

}

export interface Port {
  ip: string;
  pu: string;
  uu: string;
  bc: string;
  host: string;
  reqHost: string;
  mm: string;
}
