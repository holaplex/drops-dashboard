import React, { Fragment, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { userSelector, clearState } from './userSlice';
import { forgotPassword, loginUser, resetPassword } from './userActions';

const Schema = Yup.object().shape({
    password: Yup.string().required("This field is required"),
    passwordConfirm: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
    })
});

const ResetPassword = () => {
    const { reset_password_token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFetching, isSuccess, isError, errorMessages } =
        useSelector(userSelector);


    const onSubmit = ({ password }) => {
        dispatch(resetPassword({ password, reset_password_token }));
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessages[0]);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState());
            alert('Password reset successfully. Please login with your new password.');
            navigate('/login');
        }
    }, [isError, isSuccess, errorMessages]);

    return (
        <div className="flex items-center justify-center bg-slate-900 w-screen h-screen">
            <div className="w-full max-w-md">
                <Formik
                    initialValues={{
                        password: '',
                        passwordConfirm: '',
                    }}
                    validationSchema={Schema}
                    onSubmit={(values) => {
                        onSubmit(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                            <div
                                className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
                            >
                                Reset Password
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-normal mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id='password'
                                    name='password'
                                    type='password'
                                    placeholder=''
                                    autoComplete='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    data-testid='input-password'
                                />
                                <span class="error" style={{ color: "red" }}>
                                    {errors.password}
                                </span>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-normal mb-2"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id='passwordConfirm'
                                    name='passwordConfirm'
                                    type='password'
                                    placeholder=''
                                    autoComplete='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.passwordConfirm}
                                    data-testid='input-password'
                                />
                                <span class="error" style={{ color: "red" }}>
                                    {errors.passwordConfirm}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" disabled={isFetching} type='submit' text='Submit'>reset</button>
                            </div>
                        </Form>
                    )
                    }

                </Formik>
            </div>
        </div>
    )
}

export default ResetPassword