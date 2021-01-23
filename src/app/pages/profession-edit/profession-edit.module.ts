import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {ProfessionEditPageRoutingModule} from './profession-edit-routing.module';

import {ProfessionEditPage} from './profession-edit.page';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        IonicModule,
        ProfessionEditPageRoutingModule
    ],
    declarations: [ProfessionEditPage]
})
export class ProfessionEditPageModule {
}
