import { Component, OnInit } from '@angular/core';
import { DatosSubnetService, Neting, Port } from '../../service/datos-subnet.service';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.page.html',
  styleUrls: ['./subnet.page.scss'],
})
export class SubnetPage implements OnInit {

  HostJSON: Neting;
  conSubNet: Port[] = [];

  hostFinal: number = 0;

  arrayTemp: number[] = [];
  arraySum: number[] = [];

  ip: number[] = [];
  pu: number[] = [];
  uu: number[] = [];
  bc: number[] = [];
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
      // COMPROBACIÓN CAPACIDAD DE OCTETOS RESPECTO A LA DIAGONAL
      if (z === 0) {
        console.log(`Diagonal: ${this.HostJSON.slash}`);
        for (let i = 1; i < 31; i++) {
          if (this.HostJSON.slash == i && i >= 24) {
            this.octFour -= (Math.pow(2, ((31 - this.HostJSON.slash) + 1)) - 2);
            if (this.octFour < 0) {
              this.octFour = 0;
            }
            console.log(`Thir 4: ${this.octFour}`);
            console.log(`Thir: ${this.conThir}`);
          } else if (this.HostJSON.slash == i && i >= 16) {
            this.octFour = 0;
            this.octThree -= (Math.pow(2, ((23 - this.HostJSON.slash) + 1)) - 2);
            if (this.octThree < 0) {
              this.octThree = 0;
            }
            console.log(`Thir 3: ${this.octThree}`);
          } else if ( this.HostJSON.slash == i && i >= 8) {
            this.octFour = 0;
            this.octThree = 0;
            this.octTwo -= (Math.pow(2, ((15 - this.HostJSON.slash) + 1)) - 2);
            if (this.octTwo < 0) {
              this.octTwo = 0;
            }
            console.log(`Thir 2: ${this.octTwo}`);
          } else if ( this.HostJSON.slash == i && i >= 1) {
            this.octFour = 0;
            this.octThree = 0;
            this.octTwo = 0;
          }
        }
      }

      this.ip = [this.octOne, this.octTwo, this.octThree, this.octFour];
      this.pu = [this.octOne, this.octTwo, this.octThree, (this.octFour + 1)];

      for (let i = 0; i < this.HostJSON.hosts.length; i++) {
        this.arraySum.push(this.HostJSON.hosts[i]);
      }

      // HOST REQUERIDOS PARA LA RED

      for (let i = 0; i < 31; i++) {
        this.count += this.count + 2;
        if (this.count >= this.HostJSON.hosts[z]) {
          this.com = this.count;
          break;
        }
      }

      this.hostReq = this.com;

      //  CALCULO DE SECTORES

      console.log(`Limite OCT: ${this.limOctFirst}`);
      console.log(`Limite HOST: ${this.HostJSON.hosts[z]}`);

      for (let i = 0; i < 7; i++) {
        this.limOctFirst += this.limOctFirst + 2;
        if (this.limOctFirst >= this.HostJSON.hosts[z]) {
          this.octFour += this.limOctFirst + 1;
          this.masc[3] -= this.limOctFirst + 1;
          break;
        } else if (i >= 6) {
          this.octFour = 255;
          this.masc[3] -= 255;
        }
        console.log(`Limite 3: ${this.limOctFirst}`);
      }

      console.log(`LIMITE AUTO: ${this.limOctFirst}`);

      for (let i = 0; i < 7; i++) {
        if (this.limOctFirst >= this.HostJSON.hosts[z]) {
          this.octThree += this.limOctSecond;
          this.masc[2] -= this.limOctSecond;
          break;
        } else if (i >= 6) {
          this.octThree = 255;
          this.masc[2] -= 255;
        }
        this.limOctFirst += this.limOctFirst + 2;
        this.limOctSecond += this.limOctSecond + 1;
        console.log(`Limite 2: ${this.limOctSecond}`);
      }

      console.log(`LIMITE AUTO: ${this.limOctFirst}`);

      for (let i = 0; i < 7; i++) {
        this.limOctFirst += this.limOctFirst + 2;
        if (this.limOctFirst >= this.HostJSON.hosts[z]) {
          this.octTwo += this.limOctThird;
          this.masc[1] -= this.limOctThird;
          break;
        } else if (i >= 6) {
          this.octTwo = 255;
          this.masc[1] -= 255;
        }
        this.limOctThird += this.limOctThird + 1;
        console.log(`Limite 1: ${this.limOctThird}`);
      }

      this.uu = [this.octOne, this.octTwo, this.octThree, (this.octFour - 1)];
      this.bc = [this.octOne, this.octTwo, this.octThree, this.octFour];

      this.conSubNet[z] = {
        ip: this.ip, pu: this.pu,
        uu: this.uu, bc: this.bc,
        mm: this.masc,
        host: String(this.HostJSON.hosts[z]),
        reqHost: String(this.hostReq)
      };

      if (this.octFour !== 255) {
        this.octFour = this.octFour + 1;
      } else if (this.octThree !== 255) {
        this.octThree = this.octThree + 1;
        this.octFour = 0;
      } else {
        this.octFour = 0;
        this.octThree = 0;
        this.octTwo = this.octTwo + 1;
      }

      this.hostReq = 0;
      this.count = 0;
      this.masc = [255, 255, 255, 255];
      this.limOctFirst = 0;
      this.limOctSecond = 0;
      this.limOctThird = 0;
    }
  }

}
