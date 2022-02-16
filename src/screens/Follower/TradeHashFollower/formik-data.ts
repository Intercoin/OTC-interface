import { object, string } from 'yup';
import { Value as ValueDropdown } from 'components/Dropdown';
import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

export type Values = {
  senderAmount: string,
  hash: string,
  senderToken: ValueDropdown,
  senderPenalty: string,

  recipientAddress: string,
};
// 0x528e7c77B8F3001B512e8BF305b03CeA420951cd
export const initialValues = {
  senderAmount: '',
  hash: '',
  senderPenalty: '',
  senderToken: { value: '', label: 'Connect the network' },

  recipientAddress: '',
};

export const validationSchema = object().shape({
  senderAmount: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  hash: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  senderPenalty: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),

  senderToken: object().shape({
    value: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  }),

  recipientAddress: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
});
