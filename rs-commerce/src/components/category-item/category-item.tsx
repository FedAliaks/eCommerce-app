import { CategoryItemProps } from 'types/types';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import style from './style.module.css';

function CategoryItem({ title, onClick }: CategoryItemProps) {
  const { curCategory } = useAppSelector(apiCategoriesProductsSelector);

  const curItemClick = (): void => {
    onClick(title);
  };

  const curItemStyle = (): string =>
    `${style['category-item']} ${curCategory === title ? style['active'] : ''}`;

  return (
    <div className={curItemStyle()} onClick={curItemClick} role="presentation">
      {title}
    </div>
  );
}

export default CategoryItem;
