import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProfessionEditPage} from './profession-edit.page';

const routes: Routes = [
    {
        path: '',
        component: ProfessionEditPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfessionEditPageRoutingModule {
}
