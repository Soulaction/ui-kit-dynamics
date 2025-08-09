import React, {memo, SyntheticEvent, useEffect} from 'react';
import * as s from "./Button.module.css";
import '../../styles/global.css';

interface ButtonProps {

    label: string;
    size?: 'small' | 'normal' | 'large';
    typeButton?: 'primary' | 'success' | 'danger';
    disabled?: boolean;
    onClick: (evt: SyntheticEvent) => void;
}

/**
 * Компонента кнопки
 */
export const Button = memo(({
                    label,
                    typeButton = 'primary',
                    size = 'normal',
                    onClick,
                    ...props
                }: ButtonProps) => {

    let sizeClass: string = '';
    let typeButtonClass: string = '';

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
            {label}
        </button>
    );
});
