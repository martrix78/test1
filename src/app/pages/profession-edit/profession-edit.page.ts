import {Component, OnInit} from '@angular/core';
import {Iprofession} from '../../share/interfaces/Iprofession';
import {ApiService} from '../../share/services/api.service';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import {ValidateProfUniq} from '../../share/validators/proffesionalUniq.validator';
import {Router} from '@angular/router';

@Component({
    selector: 'app-profession-edit',
    templateUrl: './profession-edit.page.html',
    styleUrls: ['./profession-edit.page.scss'],
})
export class ProfessionEditPage implements OnInit {

    public data: Iprofession = (window.history.state.data) ? window.history.state.data : null;
    public isNew = false;
    public form: FormGroup;

    constructor(
        private api: ApiService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {

    }

    async createForm() {
        const professions = await this.api.getProfessions();
        const duty = [];
        if (this.data.duty.length) {
            this.data.duty.forEach((elem: string) => {
                duty.push(new FormControl(elem, []));
            });
        } else {
            duty.push(new FormControl('', []));
        }
        this.form = this.formBuilder.group({
            name: [this.data.name, [Validators.required, ValidateProfUniq(professions, this.data.id)]],
            salary: [this.data.salary, [Validators.required]],
            id: [this.data.id, []],
            duty: new FormArray(duty),

        }, {
            validator: [this.validateDuty]
        });
    }

    validateDuty: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
        if (!form.get('duty')) {
            return null;
        }
        const duty = (form.get('duty').value as []).map((item: string) => item.toLowerCase().trim());
        const set = new Set(duty);

        if (set.size !== duty.length) {
            return {duty: true};
        }
        return null;
    };

    checkForLast(i: number) {
        return (this.form.get('duty') as FormArray).length > (i + 1);
    }

    checkForOne() {
        return (this.form.get('duty') as FormArray).length === 1;
    }

    addDuty() {
        (this.form.get('duty') as FormArray).push(new FormControl('', []));
    }

    removeDuty(i: number) {
        (this.form.get('duty') as FormArray).removeAt(i);
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
            console.log(this.form);
            return;
        }
        const data = this.form.value;
        data.duty = data.duty.filter(e => e.trim().length > 0);
        if (this.isNew) {
            this.api.saveProfession(data);
        } else {
            this.api.updateProfession(data);
        }
        this.api.presentToast('Данные сохранены');
        this.router.navigateByUrl('/profession');
    }

    ngOnInit() {
        if (this.data === null) {
            this.data = {duty: [], id: null, name: '', salary: null};
            this.isNew = true;
        }
        this.createForm();
    }

}
