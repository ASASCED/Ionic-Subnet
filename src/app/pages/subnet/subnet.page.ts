import { Component, OnInit } from '@angular/core';
import { DatosSubnetService, Neting } from '../../service/datos-subnet.service';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.page.html',
  styleUrls: ['./subnet.page.scss'],
})
export class SubnetPage implements OnInit {

  HostJSON: Neting;
  arrayTemp: number[] = [];
  arraySum: number[] = [];
  octOne: number = 0;
  octTwo: number = 0;
  octThree: number = 0;
  octFour: number = 0;
  sumHost: number = 0;
  limOctFirst: number = 0;
  limOctSecond: number = 0;
  limOctThird: number = 0;
  continue: boolean = true;

  constructor(private _datosSubnet: DatosSubnetService) {
    this.HostJSON = Object.assign({}, this._datosSubnet.getNet());
    console.log(this.HostJSON);

    for (let i = 0; i < this.HostJSON.ip.length; i++) {
      this.arrayTemp.push(this.HostJSON.ip[i]);
    }

    this.octOne = this.arrayTemp[0];
    this.octTwo = this.arrayTemp[1];
    this.octThree = this.arrayTemp[2];
    this.octFour = this.arrayTemp[3];

    for (let i = 0; i < this.HostJSON.hosts.length; i++) {
      this.arraySum.push(this.HostJSON.hosts[i]);
    }

    for (let i = 0; i < this.HostJSON.hosts.length; i++) {
      this.sumHost = this.sumHost + +this.arraySum[i];
    }

    console.log('LIMITEFirst: ' + this.limOctFirst);
    console.log('LIMITESecond: ' + this.limOctSecond);
    console.log('LIMITEThird: ' + this.limOctThird);
    console.log('ULTIMO: ' + this.octFour);
    console.log('HOST: ' + this.HostJSON.hosts[0]);
    console.log('SUM: ' + this.sumHost);

    //  CALCULO DE SECTORES

    if (this.sumHost >= this.HostJSON.hosts[0]) {
      for (let i = 0; i < 7; i++) {
        if (i >= 1) {
          this.limOctFirst += this.limOctFirst + 2;
        }
        if (this.limOctFirst >= this.HostJSON.hosts[0]) {
          this.octFour = this.limOctFirst;
          this.continue = false;
          break;
        } else if (i >= 6) {
          console.log('Paso por 255 de first');
          this.octFour = 255;
          this.limOctFirst = 255;
        }
        console.log('AUMENTO: ' + this.limOctFirst);
      }
    }

    if (this.sumHost >= this.HostJSON.hosts[0] && this.continue === true) {
      for (let i = 0; i < 7; i++) {
        if (this.limOctFirst >= this.HostJSON.hosts[0]) {
          this.octThree = this.limOctSecond;
          this.continue = false;
          break;
        } else if (i >= 6) {
          this.octThree = 255;
          console.log('Paso por 255 de second');
        }
        this.limOctFirst += this.limOctFirst + 2;
        this.limOctSecond += this.limOctSecond + 1;
        console.log('AUMENTO: ' + this.limOctSecond);
        console.log('AUMENTOFirst: ' + this.limOctFirst);
      }
    }

    if (this.sumHost >= this.HostJSON.hosts[0] && this.continue === true) {
      for (let i = 0; i < 7; i++) {
        this.limOctFirst += this.limOctFirst + 2;
        if (this.limOctFirst >= this.HostJSON.hosts[0]) {
          this.octTwo = this.limOctThird;
          this.continue = false;
          break;
        } else if (i >= 6) {
          this.octTwo = 255;
          console.log('Paso por 255 de third');
        }
        this.limOctThird += this.limOctThird + 1;
        console.log('AUMENTO: ' + this.limOctThird);
        console.log('AUMENTOFirst: ' + this.limOctFirst);
      }
    }

    console.log(this.octFour);
    console.log(this.octThree);
    console.log(this.octTwo);
    console.log(this.octOne);
  }

  ngOnInit() {
  }

  limpiar() {
    console.log('Net limpio');
    this._datosSubnet.clearNet();
  }

}
