import { AuthService } from './Auth.service';
import { WebService } from './Web.service';
import { Note } from '../models/INote';
export class NoteService extends WebService<Note> {
    URL = 'Notes';
    userId: number;
    constructor() {
        super();
        const auth = new AuthService();
        this.userId = auth.getUser().nameid;
    }
    getNodeNotes(node: string) {
        return this.get<Note[]>(`${this.userId}/${node}`);
    }

    saveNote(noteContent: { title: string; body: string }) {
        const note = new Note();
        note.body = noteContent.body;
        note.userId = +this.userId;
        note.title = noteContent.title;
        delete note.id;
        return this.post<Note>(note);
    }
}
