import { Group } from '../groups/group.model';
import { UserStatistics } from '../users/user.model';

export class Preferences {
  public currentGroup?: Group;
  public currentUser?: UserStatistics;
}
