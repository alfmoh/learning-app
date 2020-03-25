import React, { Component } from 'react';
import './TextEditor.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class TextEditor extends Component<any> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    content: ''
  };

  handleChange(content: any) {
    this.setState({
      content
    });
  }
  render() {
    return (
      <div>
        <ReactQuill
          value={this.state.content}
          onChange={this.handleChange}
        ></ReactQuill>
      </div>
    );
  }
}

export default TextEditor;
