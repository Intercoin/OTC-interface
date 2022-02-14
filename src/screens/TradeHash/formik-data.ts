import { object, string } from 'yup';
import { Value as ValueDropdown } from 'components/Dropdown';
import { VALIDATION_ERROR_MESSAGES } from '../../constants';

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
  hash: 'ewewe',
  network: { value: 'rinkeby', label: 'Rinkeby' },
  token: { value: 'USDT', label: 'USDT' },
};

export const validationSchema = object().shape({
  receiverAddress: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  amount: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  hash: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),

  network: object().shape({
    value: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  }),

  token: object().shape({
    value: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  }),
});
