import { Heading, SubHeading } from 'components/heading';
import BenefitItem from 'components/benefits-item/BenefitItem';
import style from '../style.module.css';
import { benefitsItems } from './constants';

function BenefitsBlock() {
  return (
    <section className={style['benefits-block']}>
      <div className="container">
        <Heading>Get your order now</Heading>
        <SubHeading>Ordering from Hurricane Bookstore couldn’t be easier</SubHeading>
        <div className={style['benefits-block-row']}>
          {benefitsItems.map((item) => (
            <BenefitItem key={item.title} image={item.image} title={item.title} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsBlock;
