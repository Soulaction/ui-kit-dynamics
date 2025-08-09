import {memo, useEffect} from 'react';
import * as s from "./Button.module.css";

interface ButtonProps {

    label: string;
    size?: 'small' | 'normal' | 'large';
    typeButton?: 'primary' | 'success' | 'danger';
    disabled?: boolean;
    onClick: () => void;
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
    let typeButtonClass: string;

    console.log('Button');
    console.log(s, '--------------------------------12')


    useEffect(() => {
        console.log('useEffect Button');
    }, []);
    debugger
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
        default:
            typeButtonClass = s['button-primary'];
    }

    return (
        <button className={[s.button, typeButtonClass, sizeClass].join(' ')}
                onClick={onClick}
                {...props}>
            {label}
        </button>
    );
});
