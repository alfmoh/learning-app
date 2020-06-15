import * as React from 'react';
import './UserNote.scss';
import TextEditor from '../../../shared';
import { NoteService } from '../../../services/Note.service';
import { Note } from '../../../models/INote';
import { Divider } from 'semantic-ui-react';

const UserNote = (props: any) => {
    const noteServ = new NoteService();
    const [note, updateNote] = React.useState('');
    const [notes, updateNotes] = React.useState([]);
    const initNotes = () => {
        noteServ.getNodeNotes(props.node).then(({ data }) => updateNotes(data));
    };
    React.useEffect(initNotes, [props.node]);
    return (
        <React.Fragment>
            <h4>Notes</h4>
            <div className="content--background la-user-note">
                <h5>{props.node}</h5>
                <hr />
                {notes.length
                    ? notes.map((note: Note, index) => (
                          <div key={index} className="content--background">
                              {note.body}
                          </div>
                      ))
                    : ''}
                <Divider />
                <TextEditor
                    onValChange={(
                        _val: any,
                        _delta: any,
                        _source: any,
                        editor: any
                    ) => {
                        setTimeout(() => {
                            updateNote(editor.getText().trim());
                        });
                    }}
                />
                <button
                    disabled={note === '' || note === '<p><br></p>'}
                    onClick={() => {
                        noteServ
                            .saveNote({ title: props.node, body: note })
                            .then(({ data }) => {
                                updateNotes([...notes, data]);
                            });
                    }}
                    className="ui primary button la-user-note__save"
                >
                    Save
                </button>
            </div>
        </React.Fragment>
    );
};

export default UserNote;
