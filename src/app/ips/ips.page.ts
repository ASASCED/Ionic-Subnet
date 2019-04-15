import { Component, OnInit, ViewChild } from '@angular/core';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-ips',
  templateUrl: './ips.page.html',
  styleUrls: ['./ips.page.scss'],
})
export class IpsPage implements OnInit {

  hosts: string[] = [];
  count: number = 0;
  finalHosts: number[] = [];
  numero: number = 0;
  HostJSON: any[] = [
    {
      ip: '170.0.4.2',
      hosts: this.hosts
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  addHost() {
    this.hosts.push(`input${this.numero++}`);
    console.log(this.hosts);
  }

  calcularVLSM() {
    let dato: any = document.getElementsByClassName('hostCount');
    for (let i = 0; i < this.hosts.length; i++) {
      this.finalHosts.push(dato[i].value);
    }
    console.log(this.finalHosts);
  }

}
