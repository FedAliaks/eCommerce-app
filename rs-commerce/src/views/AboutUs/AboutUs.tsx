import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import { ROUTE_PATH, collaboration, team } from 'constants/constants';
import schoolIcon from 'assets/about-us/RS.svg';
import collaborationImg from 'assets/about-us/collaboration.png';
import TeamItem from './components/TeamItem';
import style from './style.module.css';

const linksList = [
  {
    link: ROUTE_PATH.main,
    name: 'Main',
  },
  {
    link: null,
    name: 'About us',
  },
];

function AboutUs() {
  return (
    <>
      <Breadcrumb linksList={linksList} currentPageName="About us" />
      <section className={`container ${style['container']}`}>
        <h2 className={style['heading']}>
          Hurricane Team with{' '}
          <a href="https://rs.school/">
            RS School <img src={schoolIcon} alt="RS School logo" />
          </a>
        </h2>
        <div className={style['team']}>
          {team.map((item) => (
            <TeamItem item={item} key={item.name} />
          ))}
        </div>
        <div className={style['collaboration']}>
          <h3 className={style['collaboration__title']}>
            Our secrets of successful collaboration:
          </h3>
          <div className={style['collaboration__content']}>
            <ul className={style['collaboration__list']}>
              {collaboration.map((item) => (
                <li key={item.title}>
                  <b>{item.title}.</b> {item.description}
                </li>
              ))}
            </ul>
            <img src={collaborationImg} alt="collaboration" />
          </div>
          <div className={style['collaboration__description']}>
            The success of our app was not just about the technical skills of the team, but about
            the collaborative spirit we nurtured. By openly communicating, playing to our strengths,
            and supporting each other, we turned a vision into a reality. This project is a
            testament to the power of teamwork!
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
