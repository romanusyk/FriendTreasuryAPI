import { UserStatistics } from './user.model';
import { Group } from './group.model';
export class Preferences {
  public currentGroup?: Group;
  public currentUser?: UserStatistics;
}
