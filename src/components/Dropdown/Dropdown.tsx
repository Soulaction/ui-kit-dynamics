import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import arrowDown from '../../assets/arrowDown.svg'
import s from './Dropdown.module.css'

interface DropdownProps {
    items: any[];
    selectItem: any;
    selectedItem: (item: any) => void;
    placeholder?: string;
    label?: string;
    value?: string;
    styles?: CSSProperties;
}

const Dropdown = ({items = [], selectItem, selectedItem, placeholder = '', label = 'label', value, styles}: DropdownProps) => {

    const [isShow, setIsShow] = useState<boolean>(false);
    const [positionCSSList, setPositionCSSList] = useState<CSSProperties>({});
    const inputDropdown = useRef<HTMLDivElement>();
    const stylePlaceHolder = !selectItem && placeholder?  s.placeholder : '';

    useEffect(() => {

        const hide = () => {
            setIsShow(false);
        }

        document.addEventListener('click', hide);
        const listClientRect: DOMRect = inputDropdown.current.getBoundingClientRect();
        setPositionCSSList({top: listClientRect.bottom, left: listClientRect.left});


        return () => {
            document.removeEventListener('click', hide);
        }
    }, [])

    const select = (item: any) => {
        selectedItem(value ? item[value] : item);
        setIsShow(false);
    }

    const show = (evt: React.MouseEvent<Element, MouseEvent>) => {
        evt.stopPropagation();
        setIsShow(!isShow)
    }

    return (
        <>
            <div className={s.inputDropdown} ref={inputDropdown} onClick={show}>
                <span className={s.dropdownLabel + ' ' + stylePlaceHolder}>{selectItem?.[label] ?? placeholder}</span>
                <img className={s.dropdownLabelIcon} src={arrowDown} alt="Иконка вниз"/>
            </div>
            {isShow &&
                <ul className={s.list} style={{...positionCSSList, ...styles}}>
                    {items.map(item =>
                        <li key={Object.values(item).join()}>
                            <button className="button btnItem" onClick={() => select(item)}>{item[label]}</button>
                        </li>)}
                </ul>
            }
        </>
    );
};

export default Dropdown;
