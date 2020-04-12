import { Note } from 'src/app/modes/note.model';

export class GetNotes {
    static readonly type = '[Note] Get All';
}

export class AddNote {
    static readonly type = '[Note] Add note';
    constructor(public payload: Note) { }
}

export class GetNote {
    static readonly type = '[Note] Get by id';
    constructor(public id: string) { }
}

export class UpdateNote {
    static readonly type = '[Note] Update note';
    constructor(public note: Note) { }
}

export class DeleteNote {
    static readonly type = '[Note] Delete note';
    constructor(public note: Note) { }
}
