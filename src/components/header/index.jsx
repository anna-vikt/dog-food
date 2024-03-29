import { Button } from '../button';
import cn from 'classnames';

import s from './styles.module.css';
import './styles.css'
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ThemeContext } from '../../contexts/theme-context';
import { CardsContext } from '../../contexts/card-context';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { ReactComponent as LogoutIcon } from './img/logout.svg';
import { ReactComponent as CartIcon } from './img/cart.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';
import { ReactComponent as UserIcon } from './img/user.svg';

export function Header({ children }) {
  const handleClickButtonEdit = () => {
    onUpdateUser({ name: 'Anna', about: 'Programmer' })
  }
  const { currentUser, onUpdateUser } = useContext(UserContext);
  const { toggleTheme } = useContext(ThemeContext);
  const { favorites } = useContext(CardsContext);
  const location = useLocation();

  return (
    <header className={s.header}>
      <div className={cn('container', s.wrapper)}>
        {children}
        <div className={s.iconsMenu}>
          <Link className={s.favoritesLink} to={{ pathname: '/favorites' }}>
            <FavoriteIcon />
            {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>

          <Link className={s.favoritesLink} to={{ pathname: '/cart' }}>
            <CartIcon />
            {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>

          <Link to="/login" className={s.iconsMenuItem} replace state={{ backgroundLocation: location, initialPath: location.pathname }}>
            <UserIcon />
            Войти
          </Link>

          <Link to='/profile' className={s.iconsMenuItem}>
            <ProfileIcon />
            {currentUser?.name}
          </Link>

          <Link to='/' className={s.iconsMenuItem}>
            <LogoutIcon />
            Выйти
          </Link>
        </div>
        {/* <span>{currentUser?.name}:{currentUser?.about}</span> */}
        {/* <span>{user?.email}</span> */}
        {/* <Button action = {handleClickButtonEdit}>
            Изменить
          </Button> */}
        {/* <label className="wraper" htmlFor="something">
          <div className="switch-wrap">
            <input type="checkbox" id="something" onChange={toggleTheme} />
            <div className="switch"></div>
          </div>
        </label> */}
      </div>
    </header>
  );
}


