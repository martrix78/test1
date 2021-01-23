import {Component, OnInit} from '@angular/core';
import {Iuser} from '../../share/interfaces/Iuser';
import {Router} from '@angular/router';
import {ApiService} from '../../share/services/api.service';
import {Iprofession} from '../../share/interfaces/Iprofession';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.page.html',
    styleUrls: ['./user-view.page.scss'],
})
export class UserViewPage implements OnInit {

    public data: Iuser = (window.history.state.data) ? window.history.state.data : null;
    public users: Iuser[] = [];

    constructor(
        private router: Router,
        private api: ApiService
    ) {
        if (this.data === null) {
            this.data = {avatar: null, dob: null, firstName: null, id: null, lastName: null, profession: []};
        }
    }

    async ngOnInit() {
        const users = await this.api.getUsers();
        this.findUsers(users);
    }

    findUsers(users: Iuser[]) {
        let duty = [];
        this.data.profession.forEach((elm: Iprofession) => {
            duty = duty.concat(elm.duty);
        });
        duty = duty.map((elem: string) => elem.toLowerCase().trim());
        console.log(duty);
        this.users = users.filter((elem: Iuser) => {
            if (elem.id === this.data.id) {
                return false;
            }
            let dutyElem = [];
            elem.profession.forEach((elm: Iprofession) => {
                dutyElem = dutyElem.concat(elm.duty);
            });
            dutyElem = dutyElem.map((elem1: string) => elem1.toLowerCase().trim());
            const intersection = duty.filter(x => dutyElem.includes(x));
            return intersection.length > 0;
        });
    }

    gotoEdit() {
        this.router.navigateByUrl('/user-edit', {state: {data: this.data}});
    }

}
