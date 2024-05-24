import { CATALOG_PAGE_TEXT } from 'constants/constants';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import style from '../style.module.css';

function CatalogPageHeader(): JSX.Element {
  const { curCategory } = useAppSelector(apiCategoriesProductsSelector);
  const headerTitle = (): string =>
    curCategory?.name['en'] ? curCategory.name['en'] : CATALOG_PAGE_TEXT.headerTitle;

  const headerSubtitle = (): string =>
    `${CATALOG_PAGE_TEXT.headerSubtitle} ${curCategory?.name['en'] ? `> ${curCategory.name['en']}` : ''}`;

  return (
    <div className={style['catalog-page-header']}>
      <div className={style['header-title']}>{headerTitle()}</div>
      <div className={style['header-subtitle']}>{headerSubtitle()}</div>
    </div>
  );
}

export default CatalogPageHeader;
