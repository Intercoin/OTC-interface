const ROOT_PREFIX = process?.env?.REACT_APP_ROOT_EXTRA_URL;

type Routes = {
  switchRole: {
    root: string,
  },
  creator: {
    root: string,
    generating: string,
    publish: {
      root: string,
      to: (tradeHash: string) => string
    },
  },
  follower: {
    root: string,
    generating: string,
    publish: {
      root: string,
      to: (tradeHash: string) => string
    },
  }
};

export const ROUTES: Routes = {
  switchRole: {
    root: `${ROOT_PREFIX}/role`,
  },
  creator: {
    root: `${ROOT_PREFIX}/creator`,
    generating: `${ROOT_PREFIX}/creator/generating`,
    publish: {
      root: `${ROOT_PREFIX}/creator/publish`,
      to: (tradeHash: string) => `${ROOT_PREFIX}/creator/publish/${tradeHash}`,
    },
  },
  follower: {
    root: `${ROOT_PREFIX}/follower`,
    generating: `${ROOT_PREFIX}/follower/generating`,
    publish: {
      root: `${ROOT_PREFIX}/follower/publish`,
      to: (tradeHash: string) => `${ROOT_PREFIX}/follower/publish/${tradeHash}`,
    },
  },
};
