import { CATALOG_PAGE_TEXT } from 'constants/constants';
import style from '../style.module.css';

function FilterSort(): JSX.Element {
  return (
    <button type="button" className={`${style['button-filter']} ${style['filter2']}`}>
      <div className={style['button-filter-text']}>{CATALOG_PAGE_TEXT.filterSort}</div>
      <input type="text" className={style['filter-input-disabled']} disabled />
    </button>
  );
}

export default FilterSort;
