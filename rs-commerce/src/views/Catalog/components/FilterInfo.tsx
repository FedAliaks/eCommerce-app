import { CATALOG_PAGE_TEXT } from 'constants/constants';
import style from '../style.module.css';

function FilterInfo(): JSX.Element {
  return (
    <div className={`${style['filter-view']} ${style['filter4']}`}>
      <div className={style['button-filter-text']}>{CATALOG_PAGE_TEXT.filterView}</div>
    </div>
  );
}

export default FilterInfo;
