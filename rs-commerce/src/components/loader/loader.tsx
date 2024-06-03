import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector, apiCategoriesProductsSelector } from 'redux/selectors';
import style from './style.module.css';

function Loader({ isShow }: { isShow?: boolean }): JSX.Element {
  const { isLoadingAuth } = useAppSelector(apiAuthSelector);
  const { isLoadingCategories, isLoadingProducts } = useAppSelector(apiCategoriesProductsSelector);
  const elClass = `${style['loader']} ${
    isLoadingAuth || isLoadingCategories || isLoadingProducts || isShow ? style['show'] : ''
  }`;

  return (
    <div className={elClass}>
      <div className={style['loader-element']} />
    </div>
  );
}

export default Loader;
