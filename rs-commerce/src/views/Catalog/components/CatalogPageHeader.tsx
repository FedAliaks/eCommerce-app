import { CATALOG_PAGE_TEXT } from 'constants/constants';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import style from '../style.module.css';

function CatalogPageHeader(): JSX.Element {
  const { curCategory } = useAppSelector(apiCategoriesProductsSelector);
  const headerTitle = (): string =>
    curCategory === CATALOG_PAGE_TEXT.allCategories ? CATALOG_PAGE_TEXT.headerTitle : curCategory;

  const headerSubtitle = (): string =>
    `${CATALOG_PAGE_TEXT.headerSubtitle} ${curCategory === CATALOG_PAGE_TEXT.allCategories ? '' : `> ${curCategory}`}`;

  return (
    <div className={style['catalog-page-header']}>
      <div className={style['header-title']}>{headerTitle()}</div>
      <div className={style['header-subtitle']}>{headerSubtitle()}</div>
    </div>
  );
}

export default CatalogPageHeader;
