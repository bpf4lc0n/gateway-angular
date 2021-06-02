import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
    selector: 'sidebar-logo',
    templateUrl: './sidebar-logo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLogoComponent implements OnInit {

    sidebarExpanded: boolean;

    constructor(
        private layoutStore: LayoutStoreService,
        private detector: ChangeDetectorRef,
        ) {}

    ngOnInit(): void {
        this.layoutStore.sidebarExpanded.subscribe((value) => {
            this.sidebarExpanded = !value;

            this.detector.detectChanges();
          });
    }
}
