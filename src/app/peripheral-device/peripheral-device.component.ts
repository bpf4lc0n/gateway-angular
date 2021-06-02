import { Component, Injector, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
    PeripheralDeviceDto,
    PeripheralDeviceServiceProxy
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { CreatePeripheralDeviceDialogComponent } from './create-peripheral-device/create-peripheral-device-dialog.component';

class PagedPeripheralDeviceRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
    sortField: string;
    descending: boolean;
}

@Component({
    selector: 'app-peripheral-device',
    templateUrl: './peripheral-device.component.html',
    animations: [appModuleAnimation()]
})
export class PeripheralDeviceComponent extends AppComponentBase implements OnInit {
    @Input() gateId: number;

    peripheralDevices: PeripheralDeviceDto[] = [];   
    
    constructor(
        injector: Injector,
        private _peripheralDevicesService:  PeripheralDeviceServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector);       
    }

    ngOnInit(): void {
        this.loadPeripheal();
    }

    loadPeripheal() {
        if (this.gateId != null)
            this._peripheralDevicesService.getAllByGate(this.gateId, true, null, null, 0, 10).subscribe((result) => {
                this.peripheralDevices = result.items;
            });
    }

    createGate(): void {
        let createOrEditGateDialog: BsModalRef;
         createOrEditGateDialog = this._modalService.show(
                CreatePeripheralDeviceDialogComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        gateId: this.gateId,
                    },
                }
            );
       
        createOrEditGateDialog.content.onSave.subscribe(() => {
            this.loadPeripheal();
        });
    }

    protected list(
        request: PagedPeripheralDeviceRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        
    }

    protected delete(peripheral: PeripheralDeviceDto): void {
        abp.message.confirm(
            this.l('AreYouSureWantToDelete', peripheral.uid),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._peripheralDevicesService.delete(peripheral.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.loadPeripheal();
                    });
                }
            }
        );
    }
}

