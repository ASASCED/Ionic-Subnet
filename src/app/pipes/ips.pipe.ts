import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ips'
})
export class IpsPipe implements PipeTransform {

  ip: string;

  transform(ip: number[]): string {
    this.ip = String(ip.join('.'));
    return this.ip;
  }

}
