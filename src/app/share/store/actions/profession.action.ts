import {Iprofession} from '../../interfaces/Iprofession';

export class AddProfession {

    static readonly type = '[Iprofession] Add';

    constructor(public payload: Iprofession) {
    }
}

export class DeleteProfession {

    static readonly type = '[Iprofession] Delete';

    constructor(public payload: Iprofession) {
    }
}

export class UpdateProfession {

    static readonly type = '[Iprofession] Update';

    constructor(public payload: Iprofession) {
    }
}
