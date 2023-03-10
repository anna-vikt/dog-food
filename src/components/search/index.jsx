
import './styles.css';
import {ReactComponent as ClosehIcon} from './assets/ic-close-input.svg';
import {ReactComponent as SearchIcon} from './assets/ic-search.svg'



export function Search({onSubmit, onChange}) {
  return (
   <form className='search' onSubmit = {onSubmit} onChange = {(e) => {onChange(e.target.value)}}>
      <input type="text" className='search__input' placeholder='Поиск' />
      <button className='search__btn'>
        <SearchIcon/>
        <ClosehIcon/>
      </button>
   </form>
  );
}


