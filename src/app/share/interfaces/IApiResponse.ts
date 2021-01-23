import {IuserResponse} from './IuserResponse';

export interface IApiResponse {
    info: any;
    results: Array<IuserResponse>;
}
