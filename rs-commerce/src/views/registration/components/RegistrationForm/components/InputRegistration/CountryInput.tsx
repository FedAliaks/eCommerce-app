import classes from './styles.module.css';

function CountryInput(): JSX.Element {
  return (
    <label htmlFor="country" className={classes['fieldForm']}>
      {' '}
      Country:
      <input id="country" list="countries" type="text" placeholder="Your country" />
      <datalist id="countries">
        <option>USA</option>
        <option>Belarus</option>
      </datalist>
    </label>
  );
}

export default CountryInput;
