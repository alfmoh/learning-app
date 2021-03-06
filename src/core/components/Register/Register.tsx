import React, { FunctionComponent, Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import './Register.scss';
import { User } from '../../../models/IUser';
import { AuthService } from '../../../services/Auth.service';

const Register: FunctionComponent<any> = props => {
    const authService = new AuthService();
    return (
        <Fragment>
            <div className="la-register-wrapper">
                <Formik
                    initialValues={{
                        userName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
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
                        confirmPassword: Yup.string()
                            .required('Required')
                            .oneOf(
                                [Yup.ref('password'), null],
                                'Passwords must match'
                            )
                    })}
                    onSubmit={(values: RegisterUser, { setSubmitting }) => {
                        const user: RegisterUser = { ...values };
                        authService
                            .register(user as User)
                            .then(val => {
                                console.log(val);
                                props.onAuth();
                                setSubmitting(false);
                            })
                            .catch(error => {
                                console.log(error);
                                setSubmitting(false);
                            });
                    }}
                >
                    <Form className="ui form">
                        <div className="field">
                            <label htmlFor="userName">Username</label>
                            <Field name="userName" type="text" />
                            <div className="text--error">
                                <ErrorMessage name="userName" />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" />
                            <div className="text--error">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" />
                            <div className="text--error">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <Field name="confirmPassword" type="password" />
                            <div className="text--error">
                                <ErrorMessage name="confirmPassword" />
                            </div>
                        </div>
                        <button className="ui primary button" type="submit">
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </Fragment>
    );
};

class RegisterUser extends User {
    confirmPassword: string;
}

export default Register;
