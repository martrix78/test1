import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Iuser} from '../../share/interfaces/Iuser';
import {ApiService} from '../../share/services/api.service';
import {Router} from '@angular/router';
import {Iprofession} from '../../share/interfaces/Iprofession';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.page.html',
    styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {
    public data: Iuser = (window.history.state.data) ? window.history.state.data : null;
    public isNew = false;
    public form: FormGroup;
    public professions = [];

    constructor(
        private api: ApiService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
    }

    async createForm() {
        this.professions = await this.api.getProfessions();
        const professions = [];
        this.professions.forEach((elem: any) => {
            const check = (this.data.profession) ? this.data.profession.find((elemNew: Iprofession) => elem.id === elemNew.id) : undefined;
            professions.push(new FormControl(check !== undefined, []));
        });

        const dob = (this.data.dob) ? this.data.dob.toISOString() : new Date().toISOString();
        this.form = this.formBuilder.group({
            firstName: [this.data.firstName, [Validators.required]],
            lastName: [this.data.lastName, [Validators.required]],
            id: [this.data.id, []],
            dob: [dob, [Validators.required]],
            profession: new FormArray(professions),
            avatar: [this.data.avatar, []],

        }, {});
    }

    ngOnInit() {
        if (this.data === null) {
            this.data = {avatar: null, dob: null, firstName: null, id: null, lastName: null, profession: []};
            this.isNew = true;
        }
        this.createForm();
    }

    validateForm(): boolean {
        const controls = this.form.controls;
        if (this.form.invalid) {
            console.error(this.form.errors);
            Object.keys(controls).forEach(controlName => {
                controls[controlName].markAsTouched();
            });
            return false;
        }
        return true;
    }

    save() {
        if (this.validateForm() === false) {
            return;
        }
        const data = this.form.value;
        const professional = [];
        data.profession.forEach((result: boolean, index: number) => {
            if (result) {
                professional.push(this.professions[index]);
            }
        });
        data.profession = professional;
        data.dob = new Date(data.dob);
        if (this.isNew) {
            this.api.saveUser(data);
        } else {
            this.api.updateUser(data);
        }
        this.api.presentToast('Данные сохранены');
        this.router.navigateByUrl('/home');
    }
}
