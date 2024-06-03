import FilterMain from './FilterMain';
import FilterSort from './FilterSort';
import FilterSearch from './FilterSearch';
import FilterInfo from './FilterInfo';
import style from '../style.module.css';

function CatalogPageFilters(): JSX.Element {
  return (
    <div className={style['catalog-filters']}>
      <div className={`container ${style['filters-wrapper']}`}>
        <FilterMain />
        <FilterSort />
        <FilterSearch />
        <FilterInfo />
      </div>
    </div>
  );
}

export default CatalogPageFilters;
