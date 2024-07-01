import style from '../style.module.css';

function DescriptionList({
  descriptionList,
}: {
  descriptionList: { [key: string]: string | undefined };
}) {
  return (
    <ul className={style['description__list']}>
      {Object.entries(descriptionList).map((item) => (
        <li key={item[0]}>
          {item[0]}: {item[1]}
        </li>
      ))}
    </ul>
  );
}

export default DescriptionList;
