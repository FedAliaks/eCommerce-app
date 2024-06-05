import ProfileComponent from 'components/profile-component/profileComponent';

import { InputProfileType, ProfileComponentType } from 'components/profile-component/types';
import CustomLink from 'components/custom-link/custom-link';
import { ROUTE_PATH } from 'constants/constants';
import { useEffect, useState } from 'react';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import classes from './UserProfile.module.css';
import UserProfileHeader from './user-profile-header/UserProfileHeader';

export default function UserProfile(): JSX.Element {
  const [state, setState] = useState<JSX.Element[]>();

  const addInfo = (ProfileUsersComponents: ProfileComponentType[]) =>
    ProfileUsersComponents.map((item, index) => (
      <ProfileComponent
        title={item.title}
        subtitle={item.subtitle}
        inputArray={item.inputArray}
        defaultAddress={item.defaultAddress}
        key={`address${index}` || item.title || item.subtitle}
        linkTo={item.linkTo}
        addressId={item.addressId}
      />
    ));

  const getPersonalInfo = () => {
    apiRootWithExistingTokenFlow()
      .me()
      .get()
      .execute()
      .then((res) => {
        const inputArrayPersonal: InputProfileType[] = [
          {
            title: 'First name',
            id: 'first-name',
            isSizeSmall: true,
            type: 'text',
            value: res.body.firstName || 'name',
            isDisabled: true,
          },
          {
            title: 'Last name',
            id: 'last-name',
            isSizeSmall: true,
            type: 'text',
            value: res.body.lastName || 'name',
            isDisabled: true,
          },
          {
            title: 'Date of birth',
            id: 'date-of-birth',
            isSizeSmall: false,
            type: 'data',
            value: res.body.dateOfBirth || '1900-01-01',
            isDisabled: true,
          },
        ];

        const ProfileUsersComponents: ProfileComponentType[] = [
          {
            title: 'Personal information',
            inputArray: inputArrayPersonal,

            linkTo: ROUTE_PATH.changeName,
          },
        ];

        const arrayAddresses = res.body.addresses;
        arrayAddresses.forEach((item) => {
          const address: InputProfileType[] = [
            {
              title: 'Country',
              id: 'country-billing',
              isSizeSmall: true,
              type: 'text',
              value: item.country || '',
              isDisabled: true,
            },
            {
              title: 'Post code',
              id: 'post-code-billing',
              isSizeSmall: true,
              type: 'text',
              value: item.postalCode || '000000',
              isDisabled: true,
            },
            {
              title: 'City',
              id: 'city-billing',
              isSizeSmall: true,
              type: 'text',
              value: item.city || 'city',
              isDisabled: true,
            },
            {
              title: 'Street',
              id: 'street-billing',
              isSizeSmall: true,
              type: 'text',
              value: item.streetName || 'street',
              isDisabled: true,
            },
          ];

          ProfileUsersComponents.push({
            title: 'Address information',
            subtitle: res.body.shippingAddressIds?.includes(item?.id || '')
              ? 'Shipping address'
              : 'Billing address',
            defaultAddress:
              (item.id || '') === res.body.defaultBillingAddressId ||
              (item.id || '') === res.body.defaultShippingAddressId,
            inputArray: address,
            addressId: item.id,

            linkTo: ROUTE_PATH.changeAddress,
          });
        });
        setState(addInfo(ProfileUsersComponents));
      });
  };

  useEffect(() => {
    getPersonalInfo();
  }, []);

  return (
    <div className={classes['container']}>
      <UserProfileHeader title="Profile" subtitle="Main > Profile" />

      <div className={classes['profile']}>
        <div className={classes['profile__column']}>{state}</div>
        <div className={classes['profile__column']}>
          <CustomLink to={ROUTE_PATH.changePassword} text="Change password" elStyle="link" />
          <div>
            <CustomLink to={ROUTE_PATH.addNewAddress} text="Add new address" elStyle="link" />
          </div>
        </div>
      </div>
    </div>
  );
}
