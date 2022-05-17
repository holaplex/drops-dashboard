import React, { Fragment, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { userSelector, clearState } from './userSlice';
import { loginUser } from './userActions';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
});

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFetching, isSuccess, isError, errorMessages } =
        useSelector(userSelector);


    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    return (
        <div className="flex items-center justify-center bg-slate-900 w-screen h-screen">
            <div className="w-full max-w-md">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        // onSubmit(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                            <div
                                className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
                            >
                                Forgot password
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-normal mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='youremail@email.com'
                                    autoComplete='email'
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // value={values.email}
                                    data-testid='input-email'
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" disabled={isFetching} type='submit' text='Submit'>Recover</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ForgotPassword