import CheckboxRegistration from 'views/registration/components/RegistrationForm/components/CheckboxRegistrarion/CheckboxRegistration';
import { AddressType, HtmlForCheckboxType } from 'types/registrationTypes';
import classes from './style.module.css';

function AddressTitleComponent(props: AddressType): JSX.Element {
  const { typeComponent } = props;
  const typeComponentUpper: string = `${typeComponent[0]?.toUpperCase()}${typeComponent?.slice(1)}`;
  return (
    <div className={classes['address__title-block']}>
      <h3 className={classes['address__subtitle']}>{`${typeComponentUpper} address`}</h3>
      <CheckboxRegistration
        content="Set as a default address"
        htmlFor={`set${typeComponentUpper}DefaultAddress` as HtmlForCheckboxType}
      />
    </div>
  );
}

export default AddressTitleComponent;
