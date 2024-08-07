import React, {CSSProperties, forwardRef, memo, useEffect, useImperativeHandle, useState} from 'react';
import s from './ContextMenu.module.css';

interface ContextMenuProps {
    items: MenuItem[];
    style?: CSSProperties | undefined;
}

export interface MenuItem {
    label: string;
    command: () => void
}

export type ContextMenuRef = {
    show: (mouseEvent: any) => void;
}

const ContextMenu = forwardRef<ContextMenuRef, ContextMenuProps>(({
                                                                      items = [],
                                                                      style
                                                                  }, ref) => {

    const [showData, setShowData] = useState<{ top: number, left: number } | null>(null);
    console.log('ContextMenu');

    useImperativeHandle<ContextMenuRef, ContextMenuRef>(ref, () => {
        return {
            show
        }
    })

    useEffect(() => {
        console.log('useEffect ContextMenu');
        const hide = () => setShowData(null);
        document.addEventListener('click', hide);

        return () => {
            document.removeEventListener('click', hide);
        }

    }, [])

    const show = (mouseEvent: any) => {
        mouseEvent.preventDefault();
        setShowData({top: mouseEvent.clientY + 1, left: mouseEvent.clientX + 1})
    }

    if (items.length === 0) {
        return;
    }

    return (
        showData && <div className={s.contextMenu} style={{...style, ...showData}}>
            <ul className={s.wrapper}>
                {items.map(item =>
                    <li key={item.label}>
                        <button className="button btnItem" onClick={item.command}>{item.label}</button>
                    </li>)
                }
            </ul>

        </div>
    );
});

export default ContextMenu;
