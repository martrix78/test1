import {AbstractControl, ValidatorFn} from '@angular/forms';

import {Iprofession} from '../interfaces/Iprofession';

export function ValidateProfUniq(professions: Iprofession[], id: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value !== null) {
            const result = professions.find((elem: Iprofession) =>
                elem.name.toLowerCase() === control.value.trim().toLowerCase() && elem.id !== id);
            return result
                ? {profNotUniq: true}
                : null;
        }
        return null;
    };
}
