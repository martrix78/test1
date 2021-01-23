import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ProfessionEditPage} from './profession-edit.page';

describe('ProfessionEditPage', () => {
    let component: ProfessionEditPage;
    let fixture: ComponentFixture<ProfessionEditPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfessionEditPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfessionEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
