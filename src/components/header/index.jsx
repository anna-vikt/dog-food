import { Button } from '../button';
import cn from 'classnames';

import s from './styles.module.css';
import './styles.css'
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ThemeContext } from '../../contexts/theme-context';

export function Header({children}) {
  const handleClickButtonEdit = () => {
    onUpdateUser({ name: 'Anna', about: 'Programmer' })
  }
  const {currentUser, onUpdateUser} = useContext(UserContext);
  const { toggleTheme } = useContext(ThemeContext);
  console.log(currentUser);
  return (
    <header className={s.header}>
       <div className={cn('container',s.wrapper)}>
          {children}
          <span>{currentUser?.name}:{currentUser?.about}</span>
          {/* <span>{user?.email}</span> */}
          {/* <Button action = {handleClickButtonEdit}>
            Изменить
          </Button> */}
          <label className="wraper" htmlFor="something">
          <div className="switch-wrap">
            <input type="checkbox" id="something" onChange={toggleTheme} />
            <div className="switch"></div>
          </div>
        </label>
       </div>
    </header>
  );
}


