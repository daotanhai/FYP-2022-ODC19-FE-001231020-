import { faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './ResetPass.module.scss';

const cx = classNames.bind(styles);

function ResetPass() {
    const nameUrl = window.location.href;
    const token_ = nameUrl.replace('http://localhost:8084/api/v1/user/password/reset/', '');
    const [randomTokenResetPassword, setRandomTokenResetPassword] = useState(token_);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            password !== confirmPassword ||
            password === '' ||
            confirmPassword === '' ||
            randomTokenResetPassword === ''
        ) {
            alert('Please type in again');
            setRandomTokenResetPassword('');
            setPassword('');
            setConfirmPassword('');
        }
        axios
            .put('http://localhost:8083/api/v1/user/password/reset', {
                headers: {
                    Authorization: 'Bearer ' + randomTokenResetPassword,
                },
                data: {
                    password: password,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    alert('Reset password successfully');
                    console.log(JSON.parse(res.config.data).data);
                }
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <h1>DRUG STORE</h1>
                </div>
                <form className={cx('content')} onSubmit={handleSubmit}>
                    <div className={cx('title')}>
                        <h2>Reset Password</h2>
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faKey} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter your token"
                            className={cx('input')}
                            type="username"
                            value={randomTokenResetPassword}
                            onChange={(e) => {
                                setRandomTokenResetPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter new password"
                            className={cx('input')}
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter your confirm password"
                            className={cx('input')}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" className={cx('login-btn')}>
                        OK
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPass;
