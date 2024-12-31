import { useState } from 'react';
import Link from 'next/link'
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import { useTranslation } from 'react-i18next';
// import { setCurrentUser } from '@store/reducers/auth';
// import { setWindowClass } from '@app/utils/helpers';
// import { Checkbox } from '@profabric/react-components';
// import * as Yup from 'yup';




import { Form, InputGroup, Button } from 'react-bootstrap';
// import { Button } from '@app/styles/common';
// import { loginWithEmail, signInByGoogle } from '@app/services/auth';
// import { useAppDispatch } from '@app/store/store';

const Login = () => {
//   const [isAuthLoading, setAuthLoading] = useState(false);
//   const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
//   const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
//   const dispatch = useAppDispatch();

//   const navigate = useNavigate();
//   const [t] = useTranslation();

//   const login = async (email: string, password: string) => {
//     try {
//       setAuthLoading(true);
//       const { user } = await loginWithEmail(email, password);
//       dispatch(setCurrentUser(user));
//       toast.success('Login is succeed!');
//       setAuthLoading(false);
//       navigate('/');
//     } catch (error: any) {
//       setAuthLoading(false);
//       toast.error(error.message || 'Failed');
//     }
//   };

//   const loginByGoogle = async () => {
//     try {
//       setGoogleAuthLoading(true);
//       await signInByGoogle();
//       toast.success('Login is succeed!');
//       setGoogleAuthLoading(false);
//     } catch (error: any) {
//       setGoogleAuthLoading(false);
//       toast.error(error.message || 'Failed');
//     }
//   };

//   const loginByFacebook = async () => {
//     try {
//       setFacebookAuthLoading(true);
//       throw new Error('Not implemented');
//     } catch (error: any) {
//       setFacebookAuthLoading(false);
//       toast.error(error.message || 'Failed');
//     }
//   };

//   const { handleChange, values, handleSubmit, touched, errors } = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Required'),
//       password: Yup.string()
//         .min(5, 'Must be 5 characters or more')
//         .max(30, 'Must be 30 characters or less')
//         .required('Required'),
//     }),
//     onSubmit: (values) => {
//       login(values.email, values.password);
//     },
//   });

//   setWindowClass('hold-transition login-page');

  return (
    <div className='d-flex min-h-100vh justify-content-center align-items-center'>
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <Link href="/" className="h1">
              <b>PLAYER</b>
              <span>LTE</span>
            </Link>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Login</p>
            <form>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  //   onChange={handleChange}
                  //   value={values.email}
                  //   isValid={touched.email && !errors.email}
                  //   isInvalid={touched.email && !!errors.email}
                  />
                  {/* {touched.email && errors.email ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  ) : (
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <i className="fas fa-envelope" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  )} */}
                </InputGroup>
              </div>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  //   onChange={handleChange}
                  //   value={values.password}
                  //   isValid={touched.password && !errors.password}
                  //   isInvalid={touched.password && !!errors.password}
                  />
                  {/* {touched.password && errors.password ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  ) : (
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <i className="fas fa-lock" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  )} */}
                </InputGroup>
              </div>

              <div className="row">
                <div className="col-8">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Check
                      type={'checkbox'}
                      id={`default-checkbox`}
                      label={`Remember Me`}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <Button
                    variant="primary"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </form>
            {/* <div className="social-auth-links text-center mt-2 mb-3">
              <Button
                className="mb-2"
                onClick={loginByFacebook}
                loading={isFacebookAuthLoading}
                disabled={true || isAuthLoading || isGoogleAuthLoading}
              >
                <i className="fab fa-facebook mr-2" />
                {t('login.button.signIn.social', {
                  what: 'Facebook',
                })}
              </Button>
              <Button
                variant="danger"
                onClick={loginByGoogle}
                loading={isGoogleAuthLoading}
                disabled={isAuthLoading || isFacebookAuthLoading}
              >
                <i className="fab fa-google mr-2" />
                {t('login.button.signIn.social', { what: 'Google' })}
              </Button>
            </div>
            */}
            <p className="mb-1">
              <Link href="/forgot-password">Forgot Password</Link>
            </p>
            <p className="mb-0">
              <Link href="/register" className="text-center">
                Register
              </Link>
            </p> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
