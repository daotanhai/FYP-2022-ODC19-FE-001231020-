import axios from 'axios';
import qs from 'qs';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstant';

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        let id = '';
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const { data } = await axios.post(
            'http://localhost:8083/api/v1/user/login',
            qs.stringify({ username, password }),
            config,
        );

        const userList = await axios.get('http://localhost:8083/api/v1/user/list');
        for (let i = 0; i < userList.data.length; i++) {
            if (data.email === userList.data[i].email) {
                id = userList.data[i].userId;
            }
        }
        const userData = await axios.get(`http://localhost:8083/api/v1/user/${id}`);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('userList', JSON.stringify(userList.data));
        localStorage.setItem('userData', JSON.stringify(userData.data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.clear()
    dispatch({ type: USER_LOGOUT });
    document.location.href = '/login';
};
