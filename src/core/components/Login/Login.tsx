import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import './Login.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login: FunctionComponent<any> = () => {
    return (
        <>
            <div className="la-login-wrapper">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .required('Required')
                            .min(8, 'Must be 8 characters or more')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        setSubmitting(false);
                    }}
                >
                    <Form className="ui form">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" />
                        </div>
                        <button className="ui button" type="submit">
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default Login;
