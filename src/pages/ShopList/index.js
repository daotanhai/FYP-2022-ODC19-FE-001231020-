import classNames from 'classnames/bind';
import ObjectItem from '../../components/ObjectItem';
import styles from './ShopList.module.scss';

const cx = classNames.bind(styles);

function ShopList() {
    const allShop = JSON.parse(localStorage.getItem('shopList'));
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Shop List</h1>
            <div className={cx('body')}>
                <div className={cx('table-address-header')}>
                    <div className={cx('rows-1')}>
                        <div className={cx('col-1', 'col')}>STT</div>
                        <div className={cx('col-2', 'col')}>Username</div>
                        <div className={cx('col-3', 'col')}>Password</div>
                        <div className={cx('col-4', 'col')}>Shopname</div>
                        <div className={cx('col-5', 'col')}>Email</div>
                        <div className={cx('col-6', 'col')}>Actions</div>
                    </div>
                </div>
                <div className={cx('table-address-body')}>
                    {allShop.map((item, index) => (
                        <ObjectItem data={item} key={index} count={index} onClick={() => true} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShopList;
