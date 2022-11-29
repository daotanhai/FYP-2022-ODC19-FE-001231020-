import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faKey, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';

import styles from './SidebarUser.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function SidebarUser() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (
        <div className={cx('sidebar-user')}>
            <div className={cx('user-name')}>
                <Link to="/user">
                    <img
                        className={cx('user-avt')}
                        src={'https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg'}
                    />
                </Link>
                <div className={cx('name-title')}>{userInfo.fullName}</div>
            </div>
            <NavLink to="/user" className={(nav) => cx('profile', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faUser} />
                <div style={{ fontSize: 16, marginLeft: 8 }}>My Account</div>
            </NavLink>
            <NavLink to="/password" className={(nav) => cx('change-password', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faKey} />
                <div style={{ fontSize: 16, marginLeft: 8 }}>Change Password</div>
            </NavLink>
            <NavLink to="/address" className={(nav) => cx('my-address', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faLocationDot} />
                <div style={{ fontSize: 16, marginLeft: 8 }}>Update Address</div>
            </NavLink>
        </div>
    );
}

export default SidebarUser;
