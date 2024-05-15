import { MessageProps } from 'types/types';
import { useEffect } from 'react';
import { MESSAGE_TIMEOUT } from 'constants/constants';
import style from './style.module.css';

function Message({ isOk, content, closeElement }: MessageProps): JSX.Element {
  useEffect(() => {
    setTimeout(closeElement, MESSAGE_TIMEOUT);
  });

  const messageClass = `${style['message-wrapper']}  ${isOk ? style['ok'] : style['error']}`;

  return (
    <div className={messageClass}>
      <div className={style['message-content']}>
        <div className={style['message-image']} />
        <div className={style['message-text']}>{content}</div>
      </div>
    </div>
  );
}

export default Message;
