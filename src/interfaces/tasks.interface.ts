import { Users } from "./users.interface";

export interface Tasks {
  id?: string;
  name: string;
  isCompleted: boolean;
  isBlocked: boolean;
  createdAt: Date;
  user?: Users;
}