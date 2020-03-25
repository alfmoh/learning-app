import * as React from 'react';
import { Formik } from 'formik';
import './PostForm.scss';
import TextEditor from '../../../shared';

class PostForm extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  handleChange(value: any) {
    this.setState({ text: value });
  }

  onTextChange(val) {
    console.log(val);
  }

  public render() {
    return (
      <div>
        <Formik
          initialValues={{ title: '', content: '' }}
          validate={values => {
            const errors: any = {};
            if (!values.title || !values.content) {
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
              <span className="la-post-form__error text--error">
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
                <TextEditor onValChange = {this.onTextChange}/>
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
