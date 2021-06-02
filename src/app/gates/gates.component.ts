import { Component, Injector } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
    GateDto,
    GateDtoPagedResultDto,
    GateServiceProxy
} from '@shared/service-proxies/service-proxies';
import { CreateGateDialogComponent } from './create-gate/create-gate-dialog.component';
import { EditGateDialogComponent } from './edit-gate/edit-gate-dialog.component';

class PagedGatesRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
    sortField: string;
    descending: boolean;
}

@Component({
    templateUrl: './gates.component.html',
    animations: [appModuleAnimation()]
})
export class GatesComponent extends PagedListingComponentBase<GateDto> {
    
    gates: GateDto[] = [];
    keyword = '';

    constructor(
        injector: Injector,
        private _gateService: GateServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector);
    }

    createGate(): void {
        this.showCreateOrEditGateDialog();
    }

    editGate(gate: GateDto): void {
        this.showCreateOrEditGateDialog(gate.id);
    }

    clearFilters(): void {
        this.keyword = '';
        this.getDataPage(1);
    }

    protected list(
        request: PagedGatesRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        request.keyword = this.keyword;
        request.sortField = this.sortField;
        request.descending = this.descending;

        this._gateService
            .getAll(
                request.descending,
                request.keyword,
                request.sortField,                
                request.skipCount,
                request.maxResultCount
            )
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: GateDtoPagedResultDto) => {
                this.gates = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(gate: GateDto): void {
        abp.message.confirm(
            this.l('AreYouSureWantToDelete', gate.human_readable_name),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._gateService.delete(gate.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        );
    }

    private showCreateOrEditGateDialog(id?: number): void {
        let createOrEditGateDialog: BsModalRef;
        if (!id) {
            createOrEditGateDialog = this._modalService.show(
                CreateGateDialogComponent,
                {
                    class: 'modal-lg',
                }
            );
        } else {
            createOrEditGateDialog = this._modalService.show(
                EditGateDialogComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id,
                    },
                }
            );
        }

        createOrEditGateDialog.content.onSave.subscribe(() => {
            this.refresh();
        });
    }
}
