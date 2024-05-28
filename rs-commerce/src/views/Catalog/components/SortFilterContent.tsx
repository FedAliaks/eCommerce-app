import { CATALOG_PAGE_TEXT } from 'constants/constants';
import { SortFilterContentProps } from 'types/types';
import style from '../style.module.css';

function SortFilterContent({ onClick }: SortFilterContentProps): JSX.Element {
  const handlerRadioFormChange = () => {
    console.log('handlerRadioFormChange');
  };
  return (
    <div className={style['filter-content']}>
      <div className={style['filter-title']}>
        <div className={style['filter-name']}>{CATALOG_PAGE_TEXT.filterSort}</div>
        <div className={style['filter-close']} onClick={onClick} role="presentation" />
      </div>
      <form className={style['radio-filter']} onChange={handlerRadioFormChange}>
        <div className={style['radio-line']}>
          <input
            type="radio"
            id="priceUp"
            name="drone"
            value="priceUp"
            className={style['radio-btn']}
          />
          <div className={style['radio-text']}>Price up</div>
        </div>
        <div className={style['radio-line']}>
          <input
            type="radio"
            id="priceDown"
            name="drone"
            value="priceDown"
            className={style['radio-btn']}
          />
          <div className={style['radio-text']}>Price down</div>
        </div>
        <div className={style['radio-line']}>
          <input
            type="radio"
            id="nameUp"
            name="drone"
            value="nameUp"
            className={style['radio-btn']}
          />
          <div className={style['radio-text']}>Name up</div>
        </div>
        <div className={style['radio-line']}>
          <input
            type="radio"
            id="nameDown"
            name="drone"
            value="nameDown"
            className={style['radio-btn']}
          />
          <div className={style['radio-text']}>Name down</div>
        </div>
      </form>
    </div>
  );
}

export default SortFilterContent;
