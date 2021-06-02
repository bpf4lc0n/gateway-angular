import { Component, Injector, ViewEncapsulation, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './column-title.component.html',
    selector: 'column-title',
    styleUrls: ['./column-title.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ColumnComponent extends AppComponentBase {
    @Input() public name: string;
    @Input() public propertyName: string;
    @Input() public sortField: string;
    @Output() clicking: EventEmitter<any> = new EventEmitter();
    descending: boolean;

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.name = '';
        this.sortField = '';
        this.descending = false;
    }

    clickFunc() {
        if(!this.propertyName) {
            this.propertyName = this.name;
        }

        this.descending = !this.descending;
        this.clicking.emit({sortField: this.propertyName, descending: this.descending });
    }
}

