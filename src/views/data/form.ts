type Field = {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value?: string | number
  state?: 'invalid' | 'success'
  message?: string
  attrs?: Record<string, string>
};

export const registration: Field[] = [
  {
    type: 'text',
    label: 'Name',
    value: 'test name',
    attrs: { readonly: '' },
  },
  {
    type: 'email',
    label: 'Email',
    state: 'success',
    value: 'test@test.test',
    message: 'success message',
  },
  {
    type: 'password',
    label: 'Password',
    attrs: { required: '' },
    state: 'invalid',
    message: 'error message',
    value: 'password',
  },
  {
    type: 'password',
    label: 'Confirm Password',
    state: 'invalid',
    value: 'pass',
    attrs: { required: '' },
  },
  {
    type: 'number',
    label: 'Age',
    attrs: { disabled: '' },
    message: 'message',
  },
  {
    type: 'text',
    label: 'Address',
  },
];
