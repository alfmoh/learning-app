import * as React from 'react';
import './UserNote.scss';
import TextEditor from '../../../shared';

const UserNote = (props: any) => {
    return (
        <React.Fragment>
            <h4>Notes</h4>
            <div className="content--background la-user-note">
                <h5>{props.node}</h5>
                <hr />
                <TextEditor
                    onValChange={(val: any) => {
                        console.log(val);
                    }}
                />
                <button className="ui primary button la-user-note__save">
                    Save
                </button>
            </div>
        </React.Fragment>
    );
};

export default UserNote;
