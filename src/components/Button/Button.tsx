import {memo, SyntheticEvent} from 'react';
import * as s from "./Button.module.css";
import {IconName} from "../Icon/type/icon-type";
import {Icon} from "../Icon/Icon";


type ButtonProps = {
    label?: string;
    typeButton?: 'primary' | 'success' | 'danger';
    size?: 'small' | 'normal' | 'large';
    iconName?: IconName;
    disabled?: boolean;
    onClick?: (evt: SyntheticEvent) => void;
}

/**
 * Компонента кнопки
 */
export const Button = memo(({
                                label,
                                iconName,
                                typeButton = 'primary',
                                size = 'normal',
                                onClick,
                                ...props
                            }: ButtonProps) => {

    let sizeClass: string = '';
    let typeButtonClass: string = '';
    console.log(s, '-----------------------');

    switch (size) {
        case 'small':
            sizeClass = s['button-small'];
            break;
        case 'large':
            sizeClass = s['button-large'];
            break;
    }

    switch (typeButton) {
        case 'success':
            typeButtonClass = s['button-success'];
            break;
        case 'danger':
            typeButtonClass = s['button-danger'];
            break;
    }

    return (
        <button className={[s.button, typeButtonClass, sizeClass].join(' ')}
                onClick={onClick}
                {...props}>
            {iconName && <Icon name={iconName}/>}
            {label}
        </button>
    );
});
