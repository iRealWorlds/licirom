import { TExpandable } from '@licirom/core/api/expandable.type';
import { User } from '@licirom/modules/users/user.model';

export interface SupportTicket {
  key: number;
  title: string;
  user: TExpandable<User, string>;
  userId: string;
  resolved: boolean;
  createdAt: Date;
}
