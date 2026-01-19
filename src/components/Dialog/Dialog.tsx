import React, {CSSProperties, memo, ReactNode, useEffect, useRef, useState} from 'react';
import * as s from './Dialog.module.css';
import {Icon} from "../Icon/Icon";

interface DialogProps {
    header: string;
    visible: boolean;
    onHide: () => void;
    style?: CSSProperties | undefined;
    maximizable?: boolean;
    draggable?: boolean;
    children?: ReactNode
}

export const Dialog = memo(({
                                header,
                                style,
                                maximizable,
                                visible,
                                onHide,
                                draggable,
                                children
                            }: DialogProps) => {
    const [maxSize, setMaxSize] = useState<boolean>(false);
    const [styleMaximizable, setStyleMaximizable] = useState<any>({});
    const [stylePosition, setStylePosition] = useState<any>({});

    const position = useRef<number[]>([0, 0]);
    const stateDraggable = useRef<boolean>(draggable ?? false);

    const changeSizeDialog = (isMax: boolean): void => {

        if (isMax) {
            stateDraggable.current = false;
            setStyleMaximizable({
                height: '100vh',
                width: '100vw',
                top: 0,
                left: 0,
                transform: 'none'
            })
        } else {
            stateDraggable.current = true;
            setStyleMaximizable({});
        }
        setMaxSize(isMax)
    }

    const dragStart = (evt: React.DragEvent): void => {
        const domRect: DOMRect = (evt.nativeEvent.target as HTMLDivElement).getBoundingClientRect();
        position.current = [evt.clientX - domRect.left, evt.clientY - domRect.top];
    }

    const drag = (evt: React.DragEvent): void => {
        evt.preventDefault();
        const [x, y] = position.current;
        setStylePosition({top: evt.clientY - y, left: evt.clientX - x, transform: 'none'})
    }

    const dragOver = (evt: React.DragEvent): void => {
        evt.preventDefault();
    }

    return (
        visible &&
        <div className={s.dialogWrapper}
             onDragOver={dragOver}>
            <div className={s.dialog}
                 style={{...style, ...stylePosition, ...styleMaximizable}}>
                <div className={s.header}
                     draggable={stateDraggable.current}
                     onDragStart={dragStart}
                     onDrag={drag}>
                    <h1 className={s.headerTitle}>
                        {header}
                    </h1>
                    {maximizable &&
                        (maxSize ?
                                <button className={`${s.headerButton} button`} onClick={() => changeSizeDialog(false)}>
                                    <Icon name='minimize'/>
                                </button>
                                :
                                <button className={`${s.headerButton} button`} onClick={() => changeSizeDialog(true)}>
                                    <Icon name='maximize'/>
                                </button>
                        )}
                    <button className={`${s.headerButton} button`} onClick={onHide}>
                        <Icon name='cross'/>
                    </button>
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    );
});
