import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector, apiCategoriesProductsSelector } from 'redux/selectors';
import style from './style.module.css';

function Loader(): JSX.Element {
  const { isLoadingAuth } = useAppSelector(apiAuthSelector);
  const { isLoadingCategories, isLoadingProducts } = useAppSelector(apiCategoriesProductsSelector);
  const elClass = `${style['loader']} ${
    isLoadingAuth || isLoadingCategories || isLoadingProducts ? style['show'] : ''
  }`;

  return (
    <div className={elClass}>
      <div className={style['loader-element']} />
    </div>
  );
}

export default Loader;
