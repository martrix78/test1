import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Iuser} from '../../interfaces/Iuser';
import {AddUser, FilterUsers, UpdateUser} from '../actions/user.action';
import {DeleteUser} from '../actions/user.action';
import {Iprofession} from '../../interfaces/Iprofession';

export class UserStateModel {
    users: Iuser[];
    filterText: string;
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        filterText: '',
        users: []
    }
})

export class UserState {

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    @Selector()
    static filteredUsers(state: UserStateModel) {
        return state.users.filter((user: Iuser) => {
            const search = state.filterText.toLowerCase().trim();
            if (user.firstName.toLowerCase().indexOf(search) === 0
                || user.lastName.toLowerCase().indexOf(search) === 0) {
                return true;
            }
            let duty = [];
            user.profession.forEach((elm: Iprofession) => {
                duty = duty.concat(elm.duty);
            });
            duty = duty.map((elem: string) => elem.toLowerCase().trim());
            let result = false;
            duty.forEach((element: string) => {
                if (element.indexOf(search) === 0) {
                    result = true;
                }
            });
            return result;
        });
    }


    @Action(FilterUsers)
    updateFilter({patchState}: StateContext<UserStateModel>, {payload}: FilterUsers) {
        patchState({filterText: payload.search});
    }

    @Action(AddUser)
    add({getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
        const state = getState();
        patchState({
            users: [...state.users, payload]
        });
    }

    @Action(DeleteUser)
    delete({getState, patchState}: StateContext<UserStateModel>, {payload}: DeleteUser) {
        const state = getState();
        const idx = (state.users as []).findIndex((item: Iuser) => payload.id === item.id);
        if (idx !== -1) {
            state.users.splice(idx, 1);
            patchState(state);
        }
    }

    @Action(UpdateUser)
    update({getState, patchState}: StateContext<UserStateModel>, {payload}: UpdateUser) {
        const state = getState();
        const idx = (state.users as []).findIndex((item: Iuser) => payload.id === item.id);
        if (idx !== -1) {
            state.users[idx] = payload;
            patchState(state);
        }
    }
}
