import classes from './styles.module.css';

function ButtonRegistration(): JSX.Element {
  const registrationClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('click registration');
  };
  return (
    <div className={classes['fieldBtn']}>
      <button
        type="submit"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => registrationClick(e)}
        className={classes['btn']}>
        Registration
      </button>
    </div>
  );
}

export default ButtonRegistration;
