import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ips',
  templateUrl: './ips.page.html',
  styleUrls: ['./ips.page.scss'],
})
export class IpsPage implements OnInit {

  hosts: string[] = [];
  ip: string[] = [];
  slash: string;
  count = 0;
  finalHosts: number[] = [];
  numero = 0;
  HostJSON: any = {
    ip: [],
    hosts: [],
    slash: '/1'
  };

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  addHost() {
    this.hosts.push(`input${this.numero++}`);
    console.log(this.hosts);
  }

  calcularVLSM() {
    const dato: any = document.getElementsByClassName('hostCount');
    const ip: any = document.getElementsByClassName('ip');

    for (let i = 0; i < this.hosts.length; i++) {
      this.finalHosts.push(dato[i].value);
    }

    for (let i = 0; i < 5; i++) {
      if (i < 4) {
        this.ip.push(ip[i].value);
      } else if (i === 4) {
        this.slash = ip[i].value;
      }
    }

    this.finalHosts = this.finalHosts.sort(this.deMenorAMayor);
    console.log(this.finalHosts);
    this.HostJSON.ip = this.ip;
    this.HostJSON.hosts = this.finalHosts;
    this.HostJSON.slash = this.slash;
    console.log(this.HostJSON);

    this._router.navigate(['/subnet', this.HostJSON]);
  }

  deMenorAMayor(elem1, elem2) {
    return elem1 - elem2;
  }

}
