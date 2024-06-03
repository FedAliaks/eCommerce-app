import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'constants/constants';
import { useDispatch } from 'react-redux';
import { updateProfileActions } from 'redux/slices/update-profile-slice';
import InputProfile from './input-profile/inputProfile';
import classes from './profileComponent.module.css';
import { ProfileComponentType } from './types';

export default function ProfileComponent(props: ProfileComponentType): JSX.Element {
  const { title, inputArray, subtitle, defaultAddress, flexVertical, addressId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveToChange = () => {
    console.log('move');
    console.log(addressId);
    dispatch(updateProfileActions.setAddressIdForChange(addressId || ''));

    if (addressId) {
      navigate(ROUTE_PATH.changeAddress, { state: { addressId } });
    } else {
      navigate(ROUTE_PATH.changeName);
    }
  };

  return (
    <div className={classes['profile__component']}>
      {title && (
        <div className={classes['profile__title-component']}>
          <h2>{title}</h2>

          <button
            aria-label="moveToChange"
            type="button"
            className={classes['profile__edit-image']}
            onClick={moveToChange}
          />
        </div>
      )}
      <div className={classes['profile__subtitle-component']}>
        {subtitle && <h3>{subtitle}</h3>}
        {defaultAddress && <p>Default address</p>}
      </div>

      <div
        className={
          flexVertical
            ? `${classes['profile__inputs-container']} ${classes['profile__inputs-container_column']}`
            : classes['profile__inputs-container']
        }>
        {inputArray.map((item) => (
          <InputProfile
            title={item.title}
            id={item.id}
            isSizeSmall={item.isSizeSmall}
            type={item.type}
            value={item.value}
            key={item.id}
            errorMsg={item.errorMsg}
            isDisabled={item.isDisabled}
            handler={item.handler}
          />
        ))}
      </div>
    </div>
  );
}
