import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerI18n,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from '../../../../logic/dateparser';
import { MenuComponent, LoanSimpleContract, LoanSimpleFormComponent } from '../../../../contracts';
import { ContractsService } from '../../../../services/contracts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @ViewChild('contractContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;
  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private contractsService: ContractsService
  ) {}

  ngOnInit() {
    if (this.isEditing()) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.contractsService.findOne(this.id)
        .subscribe(data => {
          this.createComponent(data);
        });
    } else {
      this.createMenuComponent();
    }
  }

  createComponent(contract: LoanSimpleContract) {
    this.container.clear();
    const factory =
      this.resolver.resolveComponentFactory(LoanSimpleFormComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.contract = contract;
    if (this.isEditing()) {
      this.componentRef.instance.id = this.activatedRoute.snapshot.params['id'];
    }
    this.componentRef.instance.filled.subscribe(contract => {
      if (contract.id) {
        this.editContract(contract);
      } else {
        this.addContract(contract);
      }
    });
  }

  /**
   * Add a contract to the server
   */
  addContract(contract: LoanSimpleContract): void {
    this.contractsService
      .create(contract)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contracts/', data.getId()]);
      }, err => {
        this.setMessage(
          'Impossible de créér ce contrat pour l\'instant',
          'danger'
        );
      });
  }

  /**
   * Update the contract to the server
   */
  editContract(contract: LoanSimpleContract): void {
    this.contractsService
      .update(contract, contract.id)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contracts/', this.id]);
      }, err => {
        this.setMessage(
          'Impossible de créér ce contrat pour l\'instant',
          'danger'
        );
      });
  }

  createMenuComponent() {
    this.container.clear();
    const factory =
      this.resolver.resolveComponentFactory(MenuComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.selected.subscribe(item => {
      this.onSelect(item);
    })
  }

  isEditing(): boolean {
    return !!this.activatedRoute.snapshot.params['id'];
  }

  onSelect(item: number): void {
    switch(item) {
      case 0:
        this.createComponent(LoanSimpleContract.getDefaultContract());
        break;
    }
  }

  setMessage(message: string, alert: string): void {
    console.log(message, alert);
  }

}
