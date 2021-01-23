import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../share/services/api.service';
import {Select, Store} from '@ngxs/store';
import {Iuser} from '../../share/interfaces/Iuser';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {FilterUsers} from '../../share/store/actions/user.action';
import {UserState} from '../../share/store/state/user.state';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    @Select(UserState.filteredUsers) users: Observable<Iuser[]>;
    public showSkeleton = false;
    public sceletonArray = new Array(10).fill(0);

    constructor(
        private api: ApiService,
        private store: Store,
        private router: Router,
    ) {

    }

    async ngOnInit() {
        this.showSkeleton = true;
        await this.api.initUsers();
        await this.api.initProfesion();
        this.showSkeleton = false;
    }

    deleteUser(user: Iuser) {
        if (confirm(`Удалить ${user.firstName} ${user.lastName}?`)) {
            this.api.deleteUser(user);
        }
    }

    gotoView(user: Iuser) {
        this.router.navigateByUrl('/user-view', {state: {data: user}});
    }

    search(event) {
        this.store.dispatch(new FilterUsers({search: event.target.value}));
    }

}
