import { TExpandable } from '@licirom/core/api/expandable.type';
import { User } from '@licirom/modules/users/user.model';

export interface Bid {
  key: string;
  buyer: TExpandable<User, string>;
  amount: number;
  submitTime: string;
}
