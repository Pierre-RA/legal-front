import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs as importedSaveAs } from 'file-saver';

import { LoanSimpleDisplayComponent, LoanSimpleContract } from '../../../../contracts/loan-simple';
import { AbstractContract } from '../../../../contracts/abstract-contract';
import { ContractsService } from '../../../../services/contracts.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  id: string;
  contract: AbstractContract;
  @ViewChild('contractContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private contractsService: ContractsService,
    private modalService: NgbModal
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.contractsService.findOne(this.id)
      .subscribe(data => {
        switch(data.type) {
          case 0:
            this.contract = new LoanSimpleContract().deserialize(data);
            this.container.clear();
            const factory =
              this.resolver.resolveComponentFactory(LoanSimpleDisplayComponent);
            this.componentRef = this.container.createComponent(factory);
            this.componentRef.instance.contract = this.contract;
            break;
        }
      }, err => {
        console.error(err);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  onDrop() {
    this.contractsService.delete(this.id)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contracts']);
      });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.onDrop();
    }, dismissed => {});
  }

  export(id: string, title: string) {
    this.contractsService
      .export(id)
      .subscribe(
        data => {
          importedSaveAs(data, title);
        },
        err => {
          console.log(err);
        }
      );
  }

}
