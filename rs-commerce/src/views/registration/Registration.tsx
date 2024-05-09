import classes from './style.module.css';

function Registration() {
  return (
    <div className={classes['registrationContainer']}>
      <div className={classes['registrationForm']}>
        <p className={classes['formTitle']}>Registration Field</p>
        <form>
          <label htmlFor="email" className={classes['fieldForm']}>
            {' '}
            Email:
            <div>
              <input id="email" type="email" placeholder="Your email" />
              <p className={classes['inputMistake']}>Input correct email</p>
            </div>
          </label>

          <label htmlFor="password" className={classes['fieldForm']}>
            {' '}
            Password:
            <div>
              <input id="password" type="password" placeholder="Your password" />
              <p className={classes['inputMistake']}>Use at least 8 characters</p>
            </div>
          </label>

          <label htmlFor="name" className={classes['fieldForm']}>
            {' '}
            Name:
            <div>
              <input id="name" type="text" placeholder="Your name" />
              <p className={classes['inputMistake']}>Use at least 1 character</p>
            </div>
          </label>

          <label htmlFor="surname" className={classes['fieldForm']}>
            {' '}
            Surname:
            <div>
              <input id="surname" type="text" placeholder="Your surname" />
              <p className={classes['inputMistake']}>Use at least 1 character</p>
            </div>
          </label>

          <label htmlFor="birthday" className={classes['fieldForm']}>
            {' '}
            Date of birth:
            <div>
              <input id="birthday" type="date" placeholder="Your date of birth" />
              <p className={classes['inputMistake']}>You must be over 13 years old</p>
            </div>
          </label>

          <label htmlFor="address" className={classes['fieldForm']}>
            {' '}
            Address:
            <div>
              <input id="address" type="text" placeholder="Your address" />
              <p className={classes['inputMistake']}>Use at least 1 character</p>
            </div>
          </label>

          <label htmlFor="city" className={classes['fieldForm']}>
            {' '}
            City:
            <div>
              <input id="city" type="text" placeholder="Your city" />
              <p className={classes['inputMistake']}>Use at least 1 character</p>
            </div>
          </label>

          <label htmlFor="postIndex" className={classes['fieldForm']}>
            {' '}
            PostIndex:
            <div>
              <input id="postIndex" type="text" placeholder="Your post index" />
              <p className={classes['inputMistake']}>Use correct post index</p>
            </div>
          </label>

          <label htmlFor="country" className={classes['fieldForm']}>
            {' '}
            Country:
            <input id="country" list="countries" type="text" placeholder="Your country" />
            <datalist id="countries">
              <option>USA</option>
              <option>Belarus</option>
            </datalist>
          </label>
          <div className={classes['fieldBtn']}>
            <button type="submit" className={classes['btn']}>
              Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
