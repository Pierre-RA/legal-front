import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractlist',
  templateUrl: './contractlist.component.html',
  styleUrls: ['./contractlist.component.scss']
})
export class ContractlistComponent implements OnInit {

  contracts = [{
    id: '21b1234ac90',
    name: 'Contrat de pret Victor'
  }, {
    id: '2a900340a7d',
    name: 'Contrat de pret Marcel'
  }, {
    id: '6135de43b11',
    name: 'Contrat de pret Henri'
  }];

  constructor() { }

  ngOnInit() {
  }

}
