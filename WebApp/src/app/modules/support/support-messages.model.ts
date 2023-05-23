import { TExpandable } from '@licirom/core/api/expandable.type';
import { User } from '@licirom/modules/users/user.model';

export interface SupportMessage {
  key: number;
  user: TExpandable<User, string>;
  messageContent: string;
  sentAt: Date;
}
