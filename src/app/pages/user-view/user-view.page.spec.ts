import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {UserViewPage} from './user-view.page';

describe('UserViewPage', () => {
    let component: UserViewPage;
    let fixture: ComponentFixture<UserViewPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserViewPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(UserViewPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
