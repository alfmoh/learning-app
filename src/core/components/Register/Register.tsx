import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import './Register.scss';

const Register: FunctionComponent<any> = () => {
    return (
        <>
            <div className="la-register-wrapper">
                <Formik
                    initialValues={{
                        userName: '',
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    }}
                    validationSchema={Yup.object({
                        userName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .required('Required')
                            .min(8, 'Must be 8 characters or more'),
                        passwordConfirm: Yup.string()
                            .required('Required')
                            .oneOf(
                                [Yup.ref('password'), null],
                                'Passwords must match'
                            )
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        setSubmitting(false);
                    }}
                >
                    <Form className="ui form">
                        <div className="field">
                            <label htmlFor="userName">Username</label>
                            <Field name="userName" type="text" />
                            <ErrorMessage name="userName" />
                        </div>
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
                        <div className="field">
                            <label htmlFor="passwordConfirm">
                                Confirm Password
                            </label>
                            <Field name="passwordConfirm" type="password" />
                            <ErrorMessage name="passwordConfirm" />
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

export default Register;
