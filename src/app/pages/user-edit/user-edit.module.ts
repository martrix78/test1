import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserEditPageRoutingModule} from './user-edit-routing.module';

import {UserEditPage} from './user-edit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserEditPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [UserEditPage]
})
export class UserEditPageModule {
}
