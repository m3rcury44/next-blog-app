'use client';

import styles from './styles.module.scss';
import { signInRequest, signUpRequest } from '../model';
import { signIn } from 'next-auth/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'sonner';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import AuthField from '@/entities/auth-field';
import { authSchema, TAuth } from '@/shared/types';
import Link from 'next/link';

type TAuthType = 'Sign in' | 'Sign up'

const Auth = ({ type }: { type: TAuthType }) => {

  const initialValues: TAuth = {
    email: '',
    name: '',
    password: '',
  };

  if (type === 'Sign in') {
    delete initialValues.name;
  }

  const onSubmit = async (values: TAuth, { setSubmitting }: FormikHelpers<TAuth>) => {
    let res;

    const toastId = toast.loading("Checking your data...")

    if (type === 'Sign in') {
      res = await signInRequest(values);
    } else {
      res = await signUpRequest(values);
    }

    if (res && res.ok) {
      toast.success("Everything is OK, redirecting...", {id: toastId})

      window.location.href = '/';
    } else {
      toast.error(res.message || "Something went wrong", {id: toastId});
      console.log(res);
    }

    setSubmitting(false);
  };

  const validationSchema = type === 'Sign in' ? authSchema.omit({ name: true }) : authSchema;

  return (
    <div className={styles.page}>
      <div className={styles.auth}>
        <div>
          <button onClick={() => signIn('google', { callbackUrl: '/' })}>
            <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>Google icon</title>
              <path fill="#EA4335 "
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
              <path fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
              <path fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
              <path fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
            </svg>
            {type} with Google
          </button>
          <button onClick={() => signIn('github', { callbackUrl: '/' })}>
            <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>GitHub icon</title>
              <path fill="#fff"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            {type} with GitHub
          </button>
          <hr />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(validationSchema)}
          onSubmit={onSubmit}
        >
          {({ errors, values }) => (
            <Form>
              <AuthField type="email" error={errors.email} value={values.email} />

              {type === 'Sign up' &&
                <AuthField type="name" error={errors.name} value={values.name as string} />
              }

              <AuthField type="password" error={errors.password} value={values.password} />

              <button type="submit">{type}</button>
            </Form>
          )}
        </Formik>
        {type === 'Sign in' ?
          <p>
            {"Don't"} have an account?&nbsp;
            <Link href="/sign-up">Register now!</Link>
          </p> :
          <p>
            Already have an account?&nbsp;
            <Link href="/sign-in">Log in.</Link>
          </p>
        }
      </div>
    </div>
  );
};

export default Auth;
