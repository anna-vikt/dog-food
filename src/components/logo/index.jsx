
import './styles.css';
import LogoSrc from './assets/logo.svg';


export function Logo() {
  return (
    <a href="/" className='Logo'>
      <img src={LogoSrc} alt="Логотип компании" className='logo__pic'/>
    </a>
  );
}


