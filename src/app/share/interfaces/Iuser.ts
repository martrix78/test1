import {Iprofession} from './Iprofession';

export interface Iuser {
    id: string;
    firstName: string;
    lastName: string;
    dob: Date;
    avatar: string;
    profession: Iprofession[];
}
