import * as React from 'react';
import { Formik } from 'formik';
import './PostForm.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class PostForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value: any) {
    this.setState({ text: value });
  }

  public render() {
    return (
      <div>
        <Formik
          initialValues={{ title: '' }}
          validate={values => {
            const errors: any = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            isSubmitting,
            touched,
            handleSubmit,
            handleChange
          }) => (
            <form className="la-post-form" onSubmit={handleSubmit}>
              <span className="la-post-form__error">
                {errors.title && touched.title && errors.title}
              </span>
              {/* <div className="ui input la-post-form__input">
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Post Title"
                />
              </div> */}
              <div className="la-post-form-editor">
                <ReactQuill
                  value={this.state.text}
                  onChange={this.handleChange}
                >
                {/* <div className="la-post-form-editor__area"/> */}
                </ReactQuill>
              </div>
              <button
                className="ui primary button la-post-form__button"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default PostForm;
