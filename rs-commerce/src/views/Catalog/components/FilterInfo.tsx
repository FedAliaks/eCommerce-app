import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import style from '../style.module.css';

function FilterInfo(): JSX.Element {
  const { curProductsPage, productsInPage, productsTotal } = useAppSelector(
    apiCategoriesProductsSelector,
  );
  const to = productsInPage * curProductsPage;
  const from = productsInPage * (curProductsPage - 1);

  return (
    <div className={`${style['filter-view']} ${style['filter4']}`}>
      <div className={style['button-filter-text']}>
        {`Showing ${from}-${to} of ${productsTotal} results`}
      </div>
    </div>
  );
}

export default FilterInfo;
