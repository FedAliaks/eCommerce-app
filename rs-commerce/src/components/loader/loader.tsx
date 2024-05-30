import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector, apiRegistrationSelector } from 'redux/selectors';
import style from './style.module.css';

function Loader({ isShow }: { isShow?: boolean }): JSX.Element {
  const { isLoadingAuth } = useAppSelector(apiAuthSelector);
  const { isLoadingRegistration } = useAppSelector(apiRegistrationSelector);
  const elClass = `${style['loader']} ${isLoadingAuth || isLoadingRegistration || isShow ? style['show'] : ''}`;

  return (
    <div className={elClass}>
      <div className={style['loader-element']} />
    </div>
  );
}

export default Loader;
