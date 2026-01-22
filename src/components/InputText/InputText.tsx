import React, {ChangeEvent, useEffect} from 'react';
import * as s from './InputText.module.css'

export type InputProps = {
    id?: string;
    value: string | number,
    onChange: (htmlInputElement: ChangeEvent<HTMLInputElement>) => void,
    size?: 'small' | 'normal' | 'large',
    valid?: boolean,
    className?: string,
    disabled?: boolean,
}

export const InputText = ({
                              id,
                              value,
                              onChange,
                              size = 'normal',
                              valid,
                              className = '',
                              ...props
                          }: InputProps) => {

    const validClass: string = valid ? '' : s['input-invalid'];
    let sizeClass: string;

    switch (size) {
        case 'small':
            sizeClass = s['input-small'];
            break;
        case 'large':
            sizeClass = s['input-large'];
            break;
        default:
            sizeClass = s['input-normal'];
    }

    return (
        <input id={id}
               className={[s.input, sizeClass, validClass, className].join(' ')}
               value={value}
               onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
               {...props}/>
    );
};
