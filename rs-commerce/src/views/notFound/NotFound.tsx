import { useState } from 'react';
import TransparentLink from 'components/links/TransparentLink';
import notFoundImg from 'assets/images/notFound.png';
import style from './style.module.css';

function NotFound() {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  return (
    <div className={`container ${style['main']}`}>
      <iframe
        src="https://lottie.host/embed/282a0782-2f8c-40b1-94bf-fb1dd440fe5c/UyRwcruc35.json"
        frameBorder="0"
        width="447"
        height="278"
        title="not found page animation"
        onLoad={() => {
          setAnimationLoaded(true);
        }}
        className={animationLoaded ? '' : style['none']}
      />

      <img
        src={notFoundImg}
        width="447"
        height="278"
        className={animationLoaded ? style['none'] : ''}
        alt="not found page"
      />

      <h1>Oops! The page you are looking for does not exist!</h1>
      <TransparentLink to="/" text="Main" />
    </div>
  );
}

export default NotFound;
