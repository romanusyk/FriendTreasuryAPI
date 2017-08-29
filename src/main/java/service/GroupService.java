package service;

import domain.User;

/**
 * Created by romm on 29.08.17.
 */
public interface GroupService {
    void createGroup(String title, User creator);
}
