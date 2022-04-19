import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { userSelector, clearState } from './userSlice';
import { loginUser } from './userActions';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import Error from '../../components/Error';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Login = ({ }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetching, isSuccess, isError, errorMessages } =
    useSelector(userSelector);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

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
      navigate('/');
    }
  }, [isError, isSuccess, errorMessages]);

  return (
    <div class="flex items-center justify-center bg-slate-900 w-screen h-screen">
      <div class="w-full max-w-md">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
              <div
                class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
              >
                Login
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-normal mb-2"
                  for="username"
                >
                  Email
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-normal mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='yourpassword'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  data-testid='input-password'
                />
                {errors.password && touched.password && (
                  <Error text={errors.password} />
                )}
              </div>
              <div class="flex items-center justify-between">
                <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" disabled={isFetching} type='submit' text='Submit'>Login</button>
                <a
                  class="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </Form>

            // <Form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            //   <FormField>
            //     <span>Email</span>
            //     <Input
            //       id='email'
            //       name='email'
            //       type='email'
            //       autoComplete='email'
            //       onChange={handleChange}
            //       onBlur={handleBlur}
            //       value={values.email}
            //       data-testid='input-email'
            //     />
            //     {errors.email && touched.email ? (
            //       <Error text={errors.email} />
            //     ) : null}
            //   </FormField>
            //   <FormField>
            //     <span>Password</span>
            //     <Input
            //       id='password'
            //       type='password'
            //       autoComplete='current-password'
            //       onChange={handleChange}
            //       onBlur={handleBlur}
            //       value={values.password}
            //       data-testid='input-password'
            //     />
            //     {errors.password && touched.password ? (
            //       <Error text={errors.password} />
            //     ) : null}
            //   </FormField>
            //   <Button disabled={isFetching} type='submit' text='Submit' />
            // </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
