import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosSubnetService {

  constructor() { }

  private net: Neting = {
    ip: [],
    hosts: [],
    slash: null
  };

  setNet(ip: number[], hosts: number[], slash: number) {
    this.net.ip = ip;
    this.net.hosts = hosts;
    this.net.slash = slash;
  }

  getNet(): Neting {
    return this.net;
  }

  clearNet() {
    while (this.net.ip.length > 0) {
      this.net.ip.pop();
    }

    while (this.net.hosts.length > 0) {
      this.net.hosts.pop();
    }

    this.net.slash = null;
  }
}

export interface Neting {
  ip: number[];
  hosts: number[];
  slash: number;
}
