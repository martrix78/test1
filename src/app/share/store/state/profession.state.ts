import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Iprofession} from '../../interfaces/Iprofession';
import {AddProfession, DeleteProfession, UpdateProfession} from '../actions/profession.action';

export class ProfessionStateModel {
    profession: Iprofession[];
}

@State<ProfessionStateModel>({
    name: 'profession',
    defaults: {
        profession: []
    }
})

export class ProfessionState {

    @Selector()
    static getUsers(state: ProfessionStateModel) {
        return state.profession;
    }

    @Action(AddProfession)
    add({getState, patchState}: StateContext<ProfessionStateModel>, {payload}: AddProfession) {
        const state = getState();
        patchState({
            profession: [...state.profession, payload]
        });
    }

    @Action(DeleteProfession)
    delete({getState, patchState}: StateContext<ProfessionStateModel>, {payload}: DeleteProfession) {
        const state = getState();
        const idx = (state.profession as []).findIndex((item: Iprofession) => payload.id === item.id);
        if (idx !== -1) {
            state.profession.splice(idx, 1);
            patchState(state);
        }
    }

    @Action(UpdateProfession)
    update({getState, patchState}: StateContext<ProfessionStateModel>, {payload}: UpdateProfession) {
        const state = getState();
        const idx = (state.profession as []).findIndex((item: Iprofession) => payload.id === item.id);
        if (idx !== -1) {
            state.profession[idx] = payload;
            patchState(state);
        }
    }
}
