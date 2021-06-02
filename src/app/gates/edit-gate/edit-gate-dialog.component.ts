import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  GateServiceProxy,
  GateDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './edit-gate-dialog.component.html'
})
export class EditGateDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  gate = new GateDto();  
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _gateService: GateServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ipv4ValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'pattern',
      localizationKey:
        'IPV4MustBeAtLeast7CharactersContainNumbersAndPoints',
    },
  ];
  
  ngOnInit(): void {
    this._gateService.get(this.id).subscribe((result) => {
      this.gate = result;     
    });
  }

  save(): void {
    this.saving = true;


    this._gateService
      .update(this.gate)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
