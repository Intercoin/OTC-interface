import React from 'react';

export function useDelay(ms = 600) {
  const timer = React.useRef<any>(null);

  const delay = (cb: () => void | Promise<any>) => {
    if (timer?.current) clearTimeout(timer?.current);

    // @ts-ignore
    timer.current = setTimeout(async () => {
      timer.current = null;
      if (cb) cb();
    }, ms);
  };
  return { delay };
}
