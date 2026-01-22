import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import * as s from './Dropdown.module.css'
import {Icon} from "../Icon/Icon";
import {createPortal} from "react-dom";

export type DropdownProps = {
    items: any[];
    selectItem: any;
    selectedItem: (item: any) => void;
    rowKey: string;
    placeholder?: string;
    itemLabel?: string;
    itemValue?: string;
    styles?: CSSProperties;
}

export const Dropdown = ({
                             items = [],
                             selectItem,
                             selectedItem,
                             rowKey,
                             placeholder = '',
                             itemLabel = 'label',
                             itemValue,
                             styles
                         }: DropdownProps) => {

    const [isShow, setIsShow] = useState<boolean>(false);
    const [positionCSSList, setPositionCSSList] = useState<CSSProperties>({});
    const inputDropdown = useRef<HTMLDivElement | null>(null);
    const stylePlaceHolder = !selectItem && placeholder ? s.placeholder : '';

    useEffect(() => {
        if (!rowKey) {
            console.warn('Enter the rowKey');
        }

        const hide = () => {
            setIsShow(false);
        }

        document.addEventListener('click', hide);
        if (inputDropdown.current) {
            const listClientRect: DOMRect = inputDropdown.current.getBoundingClientRect();
            setPositionCSSList({top: listClientRect.bottom, left: listClientRect.left});
        }

        return () => {
            document.removeEventListener('click', hide);
        }
    }, [rowKey]);

    const select = (item: any) => {
        selectedItem(itemValue ? item[itemValue] : item);
        setIsShow(false);
    }

    const show = (evt: React.MouseEvent<Element, MouseEvent>) => {
        evt.stopPropagation();
        setIsShow(!isShow)
    }

    const calcLabel = (selectItem: unknown): string => {
        if (typeof selectItem === 'string') {
            return selectItem;
        } else {
            if (selectItem !== null && typeof selectItem === 'object') {
                return selectItem[itemLabel];
            } else {
                return placeholder;
            }
        }
    }

    return (
        <>
            <div className={s.inputDropdown} ref={inputDropdown} onClick={show}>
                <span
                    className={s.dropdownLabel + ' ' + stylePlaceHolder}>{calcLabel(selectItem)}</span>
                <Icon className={s.dropdownLabelIcon} name='arrowDown'/>
            </div>
            {isShow && createPortal(
                <ul className={s.list} style={{...positionCSSList, ...styles}}>
                    {items.map((item, index) =>
                        <li key={rowKey ? item[rowKey] : index}>
                            <button className="button btnItem" onClick={() => select(item)}>{item[itemLabel]}</button>
                        </li>
                    )}
                </ul>,
                document.body)
            }
        </>
    );
};
