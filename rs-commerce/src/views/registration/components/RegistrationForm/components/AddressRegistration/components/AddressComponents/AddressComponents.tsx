import { AddressType, HtmlForType, InputType } from 'types/registrationTypes';
import CountryInput from '../../../InputRegistration/CountryInput';
import InputRegistration from '../../../InputRegistration/InputRegistration';
import AddressTitleComponent from './components/AddresTitleComponent/AddresTitleComponent';
import classes from './style.module.css';

const inputFieldsArray: InputType[] = [
  {
    htmlFor: `PostCode` as HtmlForType,
    title: 'Post code',
    type: 'text',
    placeholder: 'your post code',
    smallSize: true,
  },

  {
    htmlFor: `City` as HtmlForType,
    title: 'City',
    type: 'text',
    placeholder: 'your city',
    smallSize: true,
  },

  {
    htmlFor: `Street` as HtmlForType,
    title: 'Street',
    type: 'text',
    placeholder: 'your street',
    smallSize: true,
  },
];

function AddressComponent(props: AddressType): JSX.Element {
  const { typeComponent } = props;
  return (
    <div className={classes['registration__address-container']}>
      <AddressTitleComponent typeComponent={typeComponent} />

      <div className={classes['address']}>
        <CountryInput typeComponent={typeComponent} />

        {inputFieldsArray.map((item: InputType) => (
          <InputRegistration
            input={{
              htmlFor: `${typeComponent}${item.htmlFor}` as HtmlForType,
              title: item.title,
              type: item.type,
              placeholder: item.placeholder,
              smallSize: item.smallSize,
            }}
            key={`${typeComponent}${item.htmlFor}`}
            errorClassName={classes['error']}
          />
        ))}
      </div>
    </div>
  );
}

export default AddressComponent;
