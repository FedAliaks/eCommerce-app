import { Heading, SubHeading } from 'components/heading';
import benefit1 from 'assets/main/benefit-1.svg';
import benefit2 from 'assets/main/benefit-2.svg';
import benefit3 from 'assets/main/benefit-3.svg';
import BenefitItem from 'components/benefits-item/BenefitItem';
import style from '../style.module.css';

const benefitsItems = [
  {
    image: benefit1,
    title: 'Order',
    text: 'easily find your favorite books',
  },
  {
    image: benefit2,
    title: 'Delivery',
    text: 'get your order full and fast',
  },
  {
    image: benefit3,
    title: 'Benefits',
    text: 'get special offers after each order',
  },
];

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
