import { object, string } from 'yup';
import { Value as ValueDropdown } from 'components/Dropdown';

export type Values = {
  receiverAddress: string,
  amount: string,
  hash: string,
  network: ValueDropdown,
  token: ValueDropdown,
};

export const initialValues = {
  receiverAddress: '',
  amount: '',
  hash: '',
  network: { value: 'rinkeby', label: 'Rinkeby' },
  token: { value: 'USDT', label: 'USDT' },
};

const FIELD_IS_REQUIRED = 'Field is required';

export const validationSchema = object().shape({
  receiverAddress: string().required(FIELD_IS_REQUIRED),
  amount: string().required(FIELD_IS_REQUIRED),
  hash: string().required(FIELD_IS_REQUIRED),

  network: object().shape({
    value: string().required(FIELD_IS_REQUIRED),
  }),

  token: object().shape({
    value: string().required(FIELD_IS_REQUIRED),
  }),
});
