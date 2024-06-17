import { TeamMember } from 'types/types';
import Github from 'assets/about-us/github';
import style from '../style.module.css';

function TeamItem({ item }: { item: TeamMember }) {
  const { name, position, image, github, description, contribution } = item;

  return (
    <div className={style['team-item']}>
      <img src={image} className={style['team-item__image']} alt={name} />
      <div className={style['team-item__info']}>
        <div className={style['team-item__info_top']}>
          <h3 className={style['team-item__name']}>{name}</h3>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className={style['team-item__github']}
            title="GitHub profile"
            aria-label={`GitHub profile of ${name}`}>
            <Github />
          </a>
        </div>
        <p className={style['team-item__position']}>{position}</p>
        <p className={style['team-item__description']}>{description}</p>
        <div className={style['team-item__contribution']}>
          <p className={style['team-item__contribution-title']}>Contribution:</p>
          <ul>
            {contribution.map((_item) => (
              <li key={_item}>{_item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamItem;
