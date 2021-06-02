import { Component, Injector, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './home.component.html',
    animations: [appModuleAnimation()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase implements OnInit {

    public showDashboard = false;

    constructor(
        injector: Injector,
        private detector: ChangeDetectorRef,
    ) {
        super(injector);
    }

    async ngOnInit(): Promise<void> {
    }
}
