import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { NUMBER_ZERO } from 'constants/constants';
import style from '../style.module.css';

function FilterInfo(): JSX.Element {
  const { curProductsPage, productsInPage, productsTotal } = useAppSelector(
    apiCategoriesProductsSelector,
  );
  const totalNumPages = productsTotal ? Math.ceil(productsTotal / productsInPage) : NUMBER_ZERO;
  const from = productsInPage * (curProductsPage - 1) + 1;
  const to = curProductsPage === totalNumPages ? productsTotal : productsInPage * curProductsPage;

  return (
    <div className={`${style['filter-view']} ${style['filter4']}`}>
      <div className={style['button-filter-text']}>
        {`Showing ${from}-${to} of ${productsTotal} results`}
      </div>
    </div>
  );
}

export default FilterInfo;
