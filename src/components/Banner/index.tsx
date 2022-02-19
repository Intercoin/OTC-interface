import React, {
  FC,
  useState,
} from 'react';
import cn from 'classnames';

import { ReactComponent as Cross } from 'assets/image/cross.svg';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  text: string,
};

export const Banner: FC<Props> = ({
  text,
  className,
}) => {
  const [isShow, setShow] = useState<boolean>(true);

  return (
    isShow ? (
      <div className={cn(styles.container, className)}>

        <div className={styles.header}>
          <button
            onClick={() => setShow(false)}
            className={styles.closeWrapper}
          >
            <Cross className={styles.close} />
          </button>
        </div>

        <h4 className={styles.text}>
          {text}
        </h4>
      </div>
    ) : null
  );
};
