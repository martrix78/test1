export interface IuserResponse {
    dob: { age: number, date: string };
    id: { name: string, value: any };
    name: { title: string, first: string, last: string };
    picture: { large: string, medium: string, thumbnail: string };
}
