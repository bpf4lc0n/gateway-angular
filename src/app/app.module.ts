import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';

// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { ColumnComponent } from './layout/columnt-title.component';

import { GatesComponent } from '@app/gates/gates.component';
import { CreateGateDialogComponent } from '@app/gates/create-gate/create-gate-dialog.component';
import { EditGateDialogComponent } from '@app/gates/edit-gate/edit-gate-dialog.component';

import { PeripheralDeviceComponent } from '@app/peripheral-device/peripheral-device.component';
import { CreatePeripheralDeviceDialogComponent } from '@app/peripheral-device/create-peripheral-device/create-peripheral-device-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderUserMenuComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarMenuComponent,
        ColumnComponent,

        GatesComponent,
        CreateGateDialogComponent,
        EditGateDialogComponent,

        PeripheralDeviceComponent,
        CreatePeripheralDeviceDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
    ],
    providers: [],
    entryComponents: [
        CreateGateDialogComponent,
        EditGateDialogComponent,
        CreatePeripheralDeviceDialogComponent
    ],
})
export class AppModule { }
