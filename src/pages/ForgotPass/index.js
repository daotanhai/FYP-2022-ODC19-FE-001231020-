import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './ForgotPass.module.scss';

const cx = classNames.bind(styles);

function ForgotPass() {
    const [userName, setUsername] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put('http://localhost:8083/api/v1/user/password/reset', {
                userName,
            })
            .then((res) => {
                if (res.status === 200) {
                    alert('Please check mail');
                } else {
                    alert('Username wrong. Please try again');
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
                        <h2>Forgot Password</h2>
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter your username"
                            className={cx('input')}
                            type="username"
                            value={userName}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" className={cx('login-btn')}>
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPass;
