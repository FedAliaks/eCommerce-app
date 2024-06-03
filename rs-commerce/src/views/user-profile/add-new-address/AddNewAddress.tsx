import AddressComponent from 'views/registration/components/RegistrationForm/components/AddressRegistration/components/AddressComponents/AddressComponents';

export default function AddNewAddress(): JSX.Element {
  return (
    <div>
      <div>
        <AddressComponent typeComponent="shipping" />
      </div>
    </div>
  );
}
