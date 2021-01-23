import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {take} from 'rxjs/operators';
import {IApiResponse} from '../interfaces/IApiResponse';
import {Iuser} from '../interfaces/Iuser';
import {IuserResponse} from '../interfaces/IuserResponse';
import {Store} from '@ngxs/store';
import {AddUser, DeleteUser, UpdateUser} from '../store/actions/user.action';
import {Iprofession} from '../interfaces/Iprofession';
import {AddProfession, DeleteProfession, UpdateProfession} from '../store/actions/profession.action';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient,
        private store: Store,
        private toast: ToastController,
    ) {
    }

    async presentToast(message: string) {
        const toast = await this.toast.create({
            message,
            duration: 2000
        });
        toast.present();
    }

    initProfesion(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                environment.defaultProf.forEach((item: Iprofession) => {
                    item.id = this.guid();
                    this.store.dispatch(new AddProfession(item));
                });
                resolve();
            } catch (e) {
                reject();
            }
        });
    }

    getProfessions(): Promise<Iprofession[]> {
        return new Promise((resolve, reject) => {
            this.store.select(state => state.profession.profession).subscribe(res => {
                resolve(res);
            }, (e) => {
                console.error(e);
                reject(e);
            });
        });
    }

    getUsers(): Promise<Iuser[]> {
        return new Promise((resolve, reject) => {
            this.store.select(state => state.users.users).subscribe(res => {
                resolve(res);
            }, (e) => {
                console.error(e);
                reject(e);
            });
        });
    }

    saveProfession(data: Iprofession) {
        data.id = this.guid();
        this.store.dispatch(new AddProfession(data));
    }

    updateProfession(data: Iprofession) {
        this.store.dispatch(new UpdateProfession(data));
    }

    saveUser(data: Iuser) {
        data.id = this.guid();
        this.store.dispatch(new AddUser(data));
    }

    updateUser(data: Iuser) {
        this.store.dispatch(new UpdateUser(data));
    }

    initUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiEndpoint}?results=20&inc=id,name,dob,picture`)
                .pipe(take(1))
                .toPromise().then(async (res: IApiResponse) => {
                res.results.forEach((item: IuserResponse) => {
                    const user: Iuser = {
                        id: this.guid(),
                        avatar: item.picture.medium,
                        dob: new Date(item.dob.date),
                        firstName: item.name.first,
                        lastName: item.name.last,
                        profession: []
                    };
                    this.store.dispatch(new AddUser(user));
                    resolve();
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    deleteUser(user: Iuser) {
        this.store.dispatch(new DeleteUser(user));
    }

    deleteProfession(profession: Iprofession) {
        this.store.dispatch(new DeleteProfession(profession));
    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}
