import React, { FunctionComponent, Fragment, useState } from 'react';
import * as Yup from 'yup';
import './Login.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthService } from '../../../services/Auth.service';
import { User, LoginUser } from '../../../models/IUser';

const Login: FunctionComponent<any> = (props: any) => {
    const authService = new AuthService();
    const [inValid, setInValid] = useState(false);
    return (
        <Fragment>
            <div className="la-login-wrapper">
                {inValid && (
                    <div className="la-login__fail">
                        Email or Password is incorrect
                    </div>
                )}
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
                    onSubmit={(values: UserLogin, { setSubmitting }) => {
                        const user: UserLogin = { ...values };
                        authService
                            .login(user as User)
                            .then((user: LoginUser) => {
                                setInValid(false);
                                // console.log(user);
                                props.onAuth();
                                setSubmitting(false);
                            })
                            .catch(error => {
                                console.log(error);
                                if (error?.response?.status === 401) {
                                    setInValid(true);
                                }
                                setSubmitting(false);
                            });
                    }}
                >
                    <Form className="ui form">
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
                        <button className="ui primary button" type="submit">
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </Fragment>
    );
};

class UserLogin {
    email: string;
    password: string;
}

export default Login;
