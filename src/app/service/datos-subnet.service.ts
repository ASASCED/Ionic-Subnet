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
  }

  getNet(): Neting {
    return this.net;
  }

  clearNet() {
    this.net.ip.length = 0;
    this.net.hosts.length = 0;
    this.net.slash = 0;
  }
}

export interface Neting {
  ip: number[];
  hosts: number[];
  slash: number;
}

export interface Port {
  ip: number[];
  pu: number[];
  uu: number[];
  bc: number[];
  mm: number[];
  host: string;
  reqHost: string;
}
