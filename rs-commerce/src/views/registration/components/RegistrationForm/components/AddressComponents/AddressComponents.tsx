import InputRegistration from '../InputRegistration/InputRegistration';
import classes from './style.module.css';

export type AddressType = {
  typeComponent: 'billing' | 'shipping';
};

function AddressComponent(props: AddressType) {
  const { typeComponent } = props;
  const typeComponentUpper: string = `${typeComponent[0]?.toUpperCase()}${typeComponent?.slice(1)}`;
  return (
    <div className={classes['registration__address-container']}>
      <div className={classes['address__title-block']}>
        <h3 className={classes['address__subtitle']}>{`${typeComponentUpper} address`}</h3>
        <label
          className={classes['input__label']}
          htmlFor={`set${typeComponentUpper}DefaultAddress`}>
          <input
            className={classes['input_checkbox']}
            type="checkbox"
            id={`set${typeComponentUpper}DefaultAddress`}
          />
          <p className={classes['checkbox__content']}>Set as a default address</p>
        </label>
      </div>

      <div className={classes['address']}>
        <label htmlFor={`${typeComponent}Country`}>
          <p className={classes['input__title']}>Country</p>
          <div className={classes['input__block']}>
            <input
              className={classes['registration__input registration__input_small']}
              id={`${typeComponent}Country`}
              list="country"
            />
            <p className={classes['input__error']}>error message</p>
          </div>
        </label>

        <InputRegistration
          input={{
            htmlFor: `${typeComponent}PostCode`,
            title: 'Post code:',
            type: 'text',
            placeholder: 'your post code',
            mistakeContent: 'error message',
            smallSize: true,
          }}
        />

        <InputRegistration
          input={{
            htmlFor: `${typeComponent}City`,
            title: 'City:',
            type: 'text',
            placeholder: 'your city',
            mistakeContent: 'error message',
            smallSize: true,
          }}
        />

        <InputRegistration
          input={{
            htmlFor: `${typeComponent}Street`,
            title: 'Street:',
            type: 'text',
            placeholder: 'your street',
            mistakeContent: 'error message',
            smallSize: true,
          }}
        />
      </div>
    </div>
  );
}

export default AddressComponent;
