import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import Header from '../../components/Header'
import * as Yup from 'yup';

import { signupUser } from './userActions';
import { userSelector, clearState } from './userSlice';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import Error from '../../components/Error';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const parseErrorMessages = (messages) => (
    <ul>
        {messages.map((message) => (
            <li key={message}>{message}</li>
        ))}
    </ul>
);

const CreateUsers = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { isFetching, isSuccess, isError, errorMessages } =
        useSelector(userSelector);

    const onSubmit = (data) => {
        dispatch(signupUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            navigate('/users');
        }

        if (isError) {
            const parsedErrorMessages = parseErrorMessages(errorMessages);
            toast.error(parsedErrorMessages);
            dispatch(clearState());
        }
    }, [isSuccess, isError, errorMessages]);

    return (
        <Fragment>
            <Header selected="Users" />
            <div className='w-full h-screen flex items-center justify-center'>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        user_type: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        onSubmit(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form className="bg-white max-w-6xl shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                            <h2 className='mb-4 text-xl font-bold'>Create user</h2>
                            <div className="mb-4">
                                <span>Username</span>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id='username'
                                    name='username'
                                    type='username'
                                    placeholder='username'
                                    autoComplete='username'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    data-testid='input-username'
                                />
                            </div>
                            <div className="mb-4">
                                <span>Email</span>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='youremail@email.com'
                                    autoComplete='email'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    data-testid='input-email'
                                />
                            </div>
                            <div className="mb-4">
                                <span>Password</span>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id='password'
                                    name='password'
                                    type='password'
                                    placeholder='anypassword'
                                    autoComplete='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    data-testid='input-password'
                                />
                            </div>
                            <div className="mb-4">
                                <span>Role</span>
                                {/* <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id='user_type'
                                    name='user_type'
                                    type='user_type'
                                    placeholder='youremail@email.com'
                                    autoComplete='user_type'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.user_type}
                                    data-testid='input-user_type'
                                /> */}
                                <Field as="select" placeHolder="asd" name="user_type" className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option disabled selected value="" >Select a user role</option>
                                    <option value="client">Client</option>
                                    <option value="minting_vendor">Minting Vendor</option>
                                </Field>
                            </div>
                            <button className="px-4 py-2 w-full rounded text-white inline-block shadow-lg bg-gray-800 hover:bg-gray-600" disabled={isFetching} type='submit' text='Submit'>Create</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Fragment>
    )
}

export default CreateUsers
