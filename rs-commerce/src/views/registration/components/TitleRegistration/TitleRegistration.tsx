import classes from './style.module.css';

function TitleRegistration(): JSX.Element {
  return (
    <div className={classes['registration__title-block']}>
      <h1 className={classes['registration__title']}>Registration</h1>
      <div className={classes['registration__login-block']}>
        <p className={classes['registration__login-content']}>I have an account?</p>
        <p className={classes['registration__link']}>Login</p>
      </div>
    </div>
  );
}

export default TitleRegistration;
