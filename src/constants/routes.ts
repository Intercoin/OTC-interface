const ROOT_PREFIX = process?.env?.REACT_APP_ROOT_EXTRA_URL;

type Routes = {
  switchRole: string,
  creator: {
    root: string,
    lock: string,
    engage: string,
    claim: string,
  },
  follower: {
    root: string,
    lock: string,
    engage: string,
    claim: string,
  },
  withdraw: string,
};

export const ROUTES: Routes = {
  switchRole: `${ROOT_PREFIX}/role`,
  creator: {
    root: `${ROOT_PREFIX}/creator`,
    lock: `${ROOT_PREFIX}/creator/lock`,
    engage: `${ROOT_PREFIX}/creator/engage`,
    claim: `${ROOT_PREFIX}/creator/claim`,
  },
  follower: {
    root: `${ROOT_PREFIX}/follower`,
    lock: `${ROOT_PREFIX}/follower/lock`,
    engage: `${ROOT_PREFIX}/follower/engage`,
    claim: `${ROOT_PREFIX}/follower/claim`,
  },
  withdraw: `${ROOT_PREFIX}/withdraw`,
};
