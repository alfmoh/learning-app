import * as React from 'react';
import TextEditor from '../../../shared';
import { Formik } from 'formik';
import { Container } from 'semantic-ui-react';
import './Question.scss';
import { Helpers } from '../../../helpers/Helpers';

class Question extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
  }
  state = {};
  textBoxContent = '';
  onTextChange(val: string) {
    this.textBoxContent = val;
  }
  public render() {
    return (
      <Container>
        <div>
          <Formik
            initialValues={{ title: '', content: '' }}
            validate={values => {
              const errors: any = {};
              const noHtml = Helpers.trimParagraphs(this.textBoxContent);
              values.content = this.textBoxContent;
              if (!values.title) {
                errors.title = 'Required';
              }
              if (!noHtml) {
                errors.content = 'Required';
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
                <div className="ui input la-post-form-top">
                  <label
                    className="la-post-form__title"
                    htmlFor="question-input"
                  >
                    Title
                  </label>
                  <span className="text--error">
                    {errors.title && touched.title && errors.title}
                  </span>
                  <input
                    className="la-post-form__input"
                    id="question-input"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Post Title"
                  />
                </div>
                <div className="la-post-form-editor">
                  <h4 className="la-post-form-editor__heading">Details</h4>
                  <div className="la-post-form-editor__editor">
                    <div>
                      <span className="text--error">
                        {errors.content && touched.content && errors.content}
                      </span>
                    </div>
                    <TextEditor onValChange={this.onTextChange} />
                  </div>
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
      </Container>
    );
  }
}

export default Question;
