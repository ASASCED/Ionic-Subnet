import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.page.html',
  styleUrls: ['./subnet.page.scss'],
})
export class SubnetPage implements OnInit {

  HostJSON: any = {
    ip: [],
    hosts: [],
    slash: '/1'
  };

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe( data => {
      this.HostJSON = data;
    });
  }

  ngOnInit() {
  }

}
