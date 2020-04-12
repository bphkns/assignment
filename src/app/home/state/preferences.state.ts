import { State, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

interface Preference {
    prop: string;
    dir: 'asc' | 'desc';
}

interface PreferencesStateModel {
    sort: Preference[];
}

@State<PreferencesStateModel>({
    name: 'preferences',
    defaults: {
        sort: [{ prop: 'createdAt', dir: 'desc' }]
    }
})
@Injectable()
export class PreferencesState {
    @Selector()
    static getSort(state: PreferencesStateModel) {
        return state.sort;
    }
}
