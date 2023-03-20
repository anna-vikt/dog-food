import cn from 'classnames';

import s from './style.module.css';


export const Button = ({type, children, extraClass, htmlType = 'button'}) => {
    return(
        <button type={htmlType} className={cn(s.button, {[s[`button_type_${type}`]]:type})}>{children}</button>
    )
}