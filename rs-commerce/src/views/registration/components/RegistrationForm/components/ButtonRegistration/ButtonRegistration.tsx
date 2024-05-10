import classes from './styles.module.css';

function ButtonRegistration(): JSX.Element {
  const registrationClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('click registration');
  };
  return (
    <button
      type="submit"
      onClick={(e) => registrationClick(e)}
      className={classes['registration__button']}>
      Submit
    </button>
  );
}

export default ButtonRegistration;
