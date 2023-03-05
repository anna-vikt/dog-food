import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from "./components/app";

import './styles.css';
// import logoImageSrc from './images/ReactLogo.png';
// import { ReactComponent as Logo } from './images/logo.svg';

// const AppList = () => {
//   return (
//     <ul>Список
//       <li>Элемент 1</li>
//       <li>Элемент 2</li>
//     </ul>
//   )
// }

// const AppInput = ({ placeholder, label }) => {
//   return (
//     <label className='label'>
//       {label}
//       <input placeholder={placeholder} type="password" />
//     </label>

//   )
// }

// const AppHeader = ({title}) => {
//   return (
//     <div>
//       <Logo/>
//     <img className='image' src={logoImageSrc}/>
//     {title && <h1><span></span>{title}</h1>}
//   </div>
//   )
  
// }


// const App = () => {
//   return (
//     <>
//       <AppHeader/>
//       <AppHeader title="Hello World"/>
//       <AppList />
//       <AppHeader title="New World"/>
//       <AppInput placeholder="Input" label="Name" />
//       <AppInput placeholder="Input" label="Name" />
//     </>

//   )
// }




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);


