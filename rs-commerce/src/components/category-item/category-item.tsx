import style from './style.module.css';

export type CategoryItemProps = {
  title: string;
};

function CategoryItem({ title }: CategoryItemProps) {
  return <div className={style['category-item']}>{title}</div>;
}

export default CategoryItem;
