import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contract, MoralPerson, PhysicalPerson, Loan, Address } from '../../../../logic/contract';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  id: string;
  private sub: any;
  contract: Contract;

  constructor(private route: ActivatedRoute) {
    let le = new MoralPerson(
      'anthillsolutions',
      new Address('rue des confessions, 15', '', '', '1203', 'Genève', '', 'Suisse'),
      '+41 79 964 63 55',
      'info@anthillsolutions.ch'
    );
    let bo = new PhysicalPerson(
      'Pierre', 'Repetto-Andipatin', true,
      new Address('47 ch Aurélien', '', '', '83700', 'Saint-Raphaël', '', 'France'),
      '+41 79 964 63 55',
      'pierre.repetto@gmail.com'
    );
    let lo = new Loan(
      'CHF',
      12000,
      3.4
    );
    this.contract = new Contract(bo, le, lo);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
