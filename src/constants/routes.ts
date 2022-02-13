const ROOT_PREFIX = process?.env?.REACT_APP_ROOT_EXTRA_URL;

type Routes = {
  root: string,
  claim: string,
};

export const ROUTES: Routes = {
  root: `${ROOT_PREFIX}/generating`,
  claim: `${ROOT_PREFIX}/claim`,
};
