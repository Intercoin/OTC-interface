const ROOT_PREFIX = process?.env?.REACT_APP_ROOT_EXTRA_URL;

type Routes = {
  switchRole: {
    root: string,
  },
  creator: {
    root: string,
    generating: string,
    publish: string,
  },
  follower: {
    root: string,
    generating: string,
  }
};

export const ROUTES: Routes = {
  switchRole: {
    root: `${ROOT_PREFIX}/role`,
  },
  creator: {
    root: `${ROOT_PREFIX}/creator`,
    generating: `${ROOT_PREFIX}/creator/generating`,
    publish: `${ROOT_PREFIX}/creator/publish`,
  },
  follower: {
    root: `${ROOT_PREFIX}/follower`,
    generating: `${ROOT_PREFIX}/follower/generating`,
  },
};
