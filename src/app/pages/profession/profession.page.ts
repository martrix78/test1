import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Iprofession} from '../../share/interfaces/Iprofession';
import {Store} from '@ngxs/store';
import {ApiService} from '../../share/services/api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-profession',
    templateUrl: './profession.page.html',
    styleUrls: ['./profession.page.scss'],
})
export class ProfessionPage implements OnInit {
    public items: Observable<Iprofession[]>;

    constructor(
        private store: Store,
        private api: ApiService,
        private router: Router,
    ) {
        this.items = this.store.select(state => state.profession.profession);
    }

    ngOnInit() {
    }

    doDrag(ev: any, elem: Iprofession) {
        if (ev.detail.ratio === 1) {
            ev.target.closeOpened();
            if (confirm(`Удалить профессию ${elem.name}?`)) {
                this.api.deleteProfession(elem);
            }
        }
        if (ev.detail.ratio === -1) {
            ev.target.closeOpened();
            this.router.navigateByUrl('profession-edit', {state: {data: elem}});
        }
    }
}
