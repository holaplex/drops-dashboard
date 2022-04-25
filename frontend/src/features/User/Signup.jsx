import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
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

const Signup = () => {
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
      navigate('/');
    }

    if (isError) {
      const parsedErrorMessages = parseErrorMessages(errorMessages);
      toast.error(parsedErrorMessages);
      dispatch(clearState());
    }
  }, [isSuccess, isError, errorMessages]);

  return (
    <Fragment>
      <div>
        <h2>Sign Up to your account</h2>
      </div>
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
          <Form>
            <FormField>
              <span>Username</span>
              <Input
                id='username'
                type='text'
                autoComplete='username'
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username ? (
                <Error text={errors.username} />
              ) : null}
            </FormField>
            <FormField>
              <span>Email</span>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Error text={errors.email} />
              ) : null}
            </FormField>
            <FormField>
              <span>Password</span>
              <Input
                id='password'
                type='password'
                autoComplete='current-password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <Error text={errors.password} />
              ) : null}
            </FormField>
            <FormField>
              <span>Type</span>
              <Input
                id='user_type'
                type='user_type'
                autoComplete='current-user_type'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.user_type}
              />
            </FormField>
            <Button disabled={isFetching} type='submit' text='Submit' />
          </Form>
        )}
      </Formik>
      <div>
        <span>
          Or <Link to='/login'> Login</Link>
        </span>
      </div>
    </Fragment>
  );
};

export default Signup;
