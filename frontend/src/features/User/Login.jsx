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

const Login = ({}) => {
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
    <Fragment>
      <div>
        <h2>Sign in to your account</h2>
      </div>
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
          <Form>
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
                data-testid='input-email'
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
                data-testid='input-password'
              />
              {errors.password && touched.password ? (
                <Error text={errors.password} />
              ) : null}
            </FormField>
            <Button disabled={isFetching} type='submit' text='Submit' />
          </Form>
        )}
      </Formik>
      <div>
        <span>
          Or <Link to='/signup'> Signup</Link>
        </span>
      </div>
    </Fragment>
  );
};

export default Login;
