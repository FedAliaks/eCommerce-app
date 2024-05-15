import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import style from './style.module.css';

function Loader(): JSX.Element {
  const { isLoadingAuth } = useAppSelector(apiAuthSelector);
  const elClass = `${style['loader']} ${isLoadingAuth ? style['show'] : ''}`;

  return (
    <div className={elClass}>
      <div className={style['loader-element']} />
    </div>
  );
}

export default Loader;
