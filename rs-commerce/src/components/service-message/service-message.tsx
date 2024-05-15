import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { serviceMessageSelector } from 'redux/selectors';
import Message from 'components/message/message';
import { serviceMessageActions } from 'redux/slices/service-message-slice';
import { MESSAGE_TEXT } from 'constants/constants';
import style from './style.module.css';

function ServiceMessage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { authOk, authError400 } = useAppSelector(serviceMessageSelector);

  const authOkClose = (): void => {
    dispatch(serviceMessageActions.setAuthOk(false));
  };

  const authError400Close = (): void => {
    dispatch(serviceMessageActions.setAuthError400(false));
  };

  return (
    <div className={style['service-wrapper']}>
      {authOk && <Message isOk content={MESSAGE_TEXT.authOkMessage} closeElement={authOkClose} />}
      {authError400 && (
        <Message
          isOk={false}
          content={MESSAGE_TEXT.authError400Message}
          closeElement={authError400Close}
        />
      )}
    </div>
  );
}

export default ServiceMessage;
