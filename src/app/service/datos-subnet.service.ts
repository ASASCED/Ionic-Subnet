import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosSubnetService {

  constructor() { }

  private net: Neting = {
    ip: [1, 1, 1, 1],
    hosts: [3, 3, 3, 3],
    slash: 2
  };

  setNet( ip: number[], hosts: number[], slash: number ) {
    this.net.ip = ip;
    this.net.hosts = hosts;
    this.net.slash = slash;
  }

  getNet(): Neting {
    return this.net;
  }
}

export interface Neting {
  ip: number[];
  hosts: number[];
  slash: number;
}
