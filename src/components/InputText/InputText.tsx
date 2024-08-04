import React, {ChangeEvent, memo, useEffect} from 'react';
import s from './InputText.module.css'

interface InputProps {
    value: string | number,
    onChange: (htmlInputElement: ChangeEvent<HTMLInputElement>) => void,
    size?: 'small' | 'normal' | 'large',
    valid?: boolean,
    disabled?: boolean,
}

const InputText = ({
                       value,
                       onChange,
                       size = 'normal',
                       valid,
                       ...props
                   }: InputProps) => {

    const validClass: string = valid ? '' : s['input-invalid'];
    let sizeClass: string;
    console.log('InputText');

    useEffect(() => {
        console.log('useEffect InputText');
    }, []);

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
        <input className={[s.input, sizeClass, validClass].join(' ')}
               value={value}
               onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
               {...props}/>
    );
};

export default memo(InputText);
