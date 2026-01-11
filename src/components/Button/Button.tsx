import {memo, SyntheticEvent} from 'react';
import * as s from "./Button.module.css";
import {IconName} from "../Icon/type/icon-type";
import {Icon} from "../Icon/Icon";

interface ButtonProps {

    label: string;
    iconName?: IconName;
    size?: 'small' | 'normal' | 'large' | 'icon-only';
    typeButton?: 'primary' | 'success' | 'danger';
    disabled?: boolean;
    onClick: (evt: SyntheticEvent) => void;
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
        case 'icon-only':
            sizeClass = s['button-icon-only'];
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
            {size === 'icon-only' && iconName && <Icon name={iconName}/>}
            {size !== 'icon-only' && label}
        </button>
    );
});
