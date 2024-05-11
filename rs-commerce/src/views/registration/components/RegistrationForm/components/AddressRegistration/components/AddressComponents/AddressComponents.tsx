import CountryInput from '../../../InputRegistration/CountryInput';
import InputRegistration from '../../../InputRegistration/InputRegistration';
import AddressTitleComponent, {
  AddressType,
} from './components/AddresTitleComponent/AddresTitleComponent';
import classes from './style.module.css';

function AddressComponent(props: AddressType) {
  const { typeComponent } = props;
  return (
    <div className={classes['registration__address-container']}>
      <AddressTitleComponent typeComponent={typeComponent} />

      <div className={classes['address']}>
        <CountryInput typeComponent={typeComponent} />

        <InputRegistration
          input={{
            htmlFor: `${typeComponent}PostCode`,
            title: 'Post code:',
            type: 'text',
            placeholder: 'your post code',
            smallSize: true,
          }}
        />

        <InputRegistration
          input={{
            htmlFor: `${typeComponent}City`,
            title: 'City:',
            type: 'text',
            placeholder: 'your city',
            smallSize: true,
          }}
        />

        <InputRegistration
          input={{
            htmlFor: `${typeComponent}Street`,
            title: 'Street:',
            type: 'text',
            placeholder: 'your street',
            smallSize: true,
          }}
        />
      </div>
    </div>
  );
}

export default AddressComponent;
