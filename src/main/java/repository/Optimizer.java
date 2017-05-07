package repository;

import org.hibernate.HibernateException;
import org.hibernate.Session;

/**
 * Created by romm on 27.02.17.
 */
public interface Optimizer {
    Session getSession() throws HibernateException;

    void calculateDebts();
}
