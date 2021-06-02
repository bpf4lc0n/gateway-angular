import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  PeripheralDeviceServiceProxy,
  CreatePeripheralDeviceDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './create-peripheral-device-dialog.component.html'
})
export class CreatePeripheralDeviceDialogComponent extends AppComponentBase
  implements OnInit {
  gateId: number;
  saving = false;
  peripheralDevice = new CreatePeripheralDeviceDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _peripheralDeviceService: PeripheralDeviceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  states = ["Online", "Offline"];

  save(): void {
    this.saving = true;
    this.peripheralDevice.gateId = this.gateId;
    console.log(this.peripheralDevice);

    this._peripheralDeviceService
      .create(this.peripheralDevice)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
        () => {
          this.notify.error(this.l('ToManyPeripheralException'));
        });
  }
}
