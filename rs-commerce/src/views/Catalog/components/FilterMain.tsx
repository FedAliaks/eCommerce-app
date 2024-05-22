import { CATALOG_PAGE_TEXT } from 'constants/constants';
import style from '../style.module.css';

function FilterMain(): JSX.Element {
  return (
    <button type="button" className={`${style['button-filter']} ${style['filter1']}`}>
      <div className={style['button-filter-image']} />
      <div className={style['button-filter-text']}>{CATALOG_PAGE_TEXT.filterMain}</div>
    </button>
  );
}

export default FilterMain;
