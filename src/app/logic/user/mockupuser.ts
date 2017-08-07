import { User } from './user';

export const mockupUser = new User().deserialize({
  id: '1a2bc',
  name: 'Émile Chappuis',
  email: 'test@legal.ch',
});
