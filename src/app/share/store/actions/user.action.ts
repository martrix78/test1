import {Iuser} from '../../interfaces/Iuser';

export class AddUser {

    static readonly type = '[Iuser] Add';

    constructor(public payload: Iuser) {
    }
}

export class DeleteUser {

    static readonly type = '[Iuser] Delete';

    constructor(public payload: Iuser) {
    }
}

export class UpdateUser {

    static readonly type = '[Iuser] Update';

    constructor(public payload: Iuser) {
    }
}

export class FilterUsers {

    static readonly type = '[Iuser] FilterUsers';

    constructor(public payload: any) {
    }
}
