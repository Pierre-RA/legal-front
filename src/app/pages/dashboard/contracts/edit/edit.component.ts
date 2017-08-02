import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IContract } from '../../../../logic/contract.interface';
import { ContractsService } from '../../../../services/contracts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  contact: IContract;
  edit: boolean;
  message: string;
  messageType: string;
  id: string;

  constructor(
    private fb: FormBuilder,
    private contractsService: ContractsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.edit = this.activatedRoute.snapshot.data['edit'] == 'true';
    if (this.edit) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.contractsService.findOne(this.id)
        .subscribe(data => {
          this.editForm.patchValue(data);
        }, err => {
          console.error(err);
        });
    }
  }

  ngOnInit() {
  }

}
