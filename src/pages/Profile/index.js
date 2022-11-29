import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [username, setUsername] = useState('');
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        setUsername(userData.userName);
        setFullName(userData.fullName);
        setEmail(userData.email);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let item = { username, fullname, email };
        alert(`username: ${username}, fullname: ${fullname}, email: ${email}`);
        fetch(`http://localhost:8083/api/v1/booking/update`, {
            method: 'PUT',
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
            });
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3>My Profile</h3>
            </div>
            <form className={cx('user-info')} onSubmit={handleSubmit}>
                <div className={cx('user-name')}>
                    <div className={cx('title')}>Username</div>
                    <input
                        className={cx('input-username')}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className={cx('full-name')}>
                    <div className={cx('title')}>Fullname</div>
                    <input
                        value={fullname}
                        onChange={(e) => {
                            setFullName(e.target.value);
                        }}
                        className={cx('input-fullname')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('email')}>
                    <div className={cx('title')}>Email</div>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className={cx('input-email')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('role')}>
                    <div className={cx('title')}>Role</div>
                    <div style={{ color: 'gray' }}>{userInfo.roles}</div>
                </div>
                <div className={cx('save')}>
                    <button className={cx('save-btn')} type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
