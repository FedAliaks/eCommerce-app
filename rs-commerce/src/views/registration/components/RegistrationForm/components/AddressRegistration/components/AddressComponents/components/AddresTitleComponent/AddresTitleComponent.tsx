import classes from './style.module.css';

export type AddressType = {
  typeComponent: 'billing' | 'shipping';
};

function AddressTitleComponent(props: AddressType) {
  const { typeComponent } = props;
  const typeComponentUpper: string = `${typeComponent[0]?.toUpperCase()}${typeComponent?.slice(1)}`;
  return (
    <div className={classes['address__title-block']}>
      <h3 className={classes['address__subtitle']}>{`${typeComponentUpper} address`}</h3>
      <label className={classes['input__label']} htmlFor={`set${typeComponentUpper}DefaultAddress`}>
        <input
          className={classes['input_checkbox']}
          type="checkbox"
          id={`set${typeComponentUpper}DefaultAddress`}
        />
        <p className={classes['checkbox__content']}>Set as a default address</p>
      </label>
    </div>
  );
}

export default AddressTitleComponent;
