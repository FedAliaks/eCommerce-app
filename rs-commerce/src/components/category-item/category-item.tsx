import { CategoryItemProps } from 'types/types';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { CATALOG_PAGE_TEXT } from 'constants/constants';
import style from './style.module.css';

function CategoryItem({ data, onClick }: CategoryItemProps) {
  const { curCategory } = useAppSelector(apiCategoriesProductsSelector);
  const title = data ? data.name['en'] : CATALOG_PAGE_TEXT.allCategories;

  const curItemClick = (): void => {
    onClick(data);
  };

  const curItemStyle = (): string =>
    `${style['category-item']} ${curCategory?.name['en'] === data?.name['en'] ? style['active'] : ''}`;

  return (
    <div className={curItemStyle()} onClick={curItemClick} role="presentation">
      {title}
    </div>
  );
}

export default CategoryItem;
