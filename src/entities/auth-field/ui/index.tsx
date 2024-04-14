import styles from './styles.module.scss';
import { Field } from 'formik';

interface IAuthField {
  type: string
  error?: string
  value: string
}

const AuthField = ({type, error, value}: IAuthField) => {
  return (
    <label htmlFor={type}>
      <p
        className={error && value.length ? styles.errorMessage : ''}
        style={value.length > 0 ? { translate: '5px -5px' } : {}}
      >
        {!value.length ? `Enter your ${type}` : error ? error : `Your ${type} is valid`}
      </p>
      <Field id={type} name={type} type={type} />
    </label>
  );
};

export default AuthField;
