import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosSubnetService {

  constructor() { }

  private net: Neting = {
    ip: [],
    hosts: [],
    slash: 0
  };

  setNet(ip: number[], hosts: number[], slash: number) {
    this.net.ip = ip;
    this.net.hosts = hosts;
    this.net.slash = slash;

    console.log('Seting: ' + this.net.ip);
    console.log('Seting: ' + this.net.hosts);
    console.log('Seting: ' + this.net.slash);
  }

  getNet(): Neting {
    return this.net;
  }

  clearNet() {
    this.net.ip.length = 0;
    this.net.hosts.length = 0;
    this.net.slash = 0;

    console.log('Clear: ' + this.net.ip);
    console.log('Clear: ' + this.net.hosts);
    console.log('Clear: ' + this.net.slash);
  }
}

export interface Neting {
  ip: number[];
  hosts: number[];
  slash: number;
}
