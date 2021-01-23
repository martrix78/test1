import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ProfessionPage} from './profession.page';

describe('ProfessionPage', () => {
    let component: ProfessionPage;
    let fixture: ComponentFixture<ProfessionPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfessionPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfessionPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
