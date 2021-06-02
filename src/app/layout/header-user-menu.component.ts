import { Component, ChangeDetectionStrategy, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
    selector: 'header-user-menu',
    templateUrl: './header-user-menu.component.html',
    styleUrls: ['./header-user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent extends AppComponentBase implements OnInit {
    shownLoginName = '';

    constructor(
        injector: Injector,
        private _authService: AppAuthService
        ) {
        super(injector);
    
        this.shownLoginName = "admin";
      }
      
    ngOnInit(): void {        
    }

    userImage = '';

    logout(): void {
        this._authService.logout();
    }
}
