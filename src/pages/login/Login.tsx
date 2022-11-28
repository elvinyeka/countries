import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import { Key, Mail, EyeOff, EyeOn } from '../../components';
import countriesLogo from '../../assets/images/countries.png';
import { useAppDispatch, useAppSelecetor } from '../../store/hooks';
import { loginUser } from '../../features/user/userSlice';
import { IUser } from '../../types/user.interface';
import './styles.scss';

const Login = () => {
  const [showPass, setShowpass] = useState(false);
  const { isLoading, user } = useAppSelecetor((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<IUser> = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  }, [user, navigate]);
  return (
    <section className="login">
      <p className="login__warning">
        Example mail for login : <strong>eve.holt@reqres.in</strong>
      </p>
      <div className="login__wrap">
        <div className="login__img">
          <img src={countriesLogo} alt="logo countries" />
        </div>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="login__form-title">Login</h3>
          <div className="login__form-input">
            <div className="login__input-wrap">
              <input
                className={`login__input ${errors.email ? 'error' : ''}`}
                {...register('email', {
                  required: 'Required',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              <span className="login__input-focus"></span>
              <Mail
                className={`login__input-icon ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && (
              <span className="login__error">{errors.email.message}</span>
            )}
          </div>
          <div className="login__form-input">
            <div className="login__input-wrap">
              <input
                className={`login__input ${errors.password ? 'error' : ''}`}
                {...register('password', {
                  required: 'Required',
                  minLength: {
                    value: 6,
                    message: 'Must be min 6 characters',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Must be max 30 characters',
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                    message:
                      'Password must be at least one letter, one number and one special character',
                  },
                })}
                type={showPass ? 'text' : 'password'}
              />
              <span className="login__input-focus"></span>
              <Key
                className={`login__input-icon ${
                  errors.password ? 'error' : ''
                }`}
              />
              <span onClick={() => setShowpass(!showPass)}>
                {showPass ? (
                  <EyeOff className="login__input-eye" />
                ) : (
                  <EyeOn className="login__input-eye" />
                )}
              </span>
            </div>
            {errors.password && (
              <span className="login__error">{errors.password.message}</span>
            )}
          </div>
          <div>
            <button className="login__submit-btn" disabled={isLoading}>
              {isLoading ? <BeatLoader color="#fff" /> : 'login'}
            </button>
            <label className="login__remember">
              <input
                type="checkbox"
                {...register('isRemember')}
                className="login__remember-input"
              />
              <span className="login__remember-text">remember me</span>
            </label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
