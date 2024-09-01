import React, {CSSProperties, memo, ReactNode, useEffect, useRef, useState} from 'react';
import s from './Dialog.module.css';
import cross from "../../assets/cross.svg";
import maxsize from "../../assets/maximize.svg";
import minsize from "../../assets/minimize.svg";

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
    console.log('Dialog');

    useEffect(() => {
        console.log('useEffect Dialog');
    }, []);

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
                                    <img src={minsize} alt="Иконка уменьшения размера"/>
                                </button>
                                :
                                <button className={`${s.headerButton} button`} onClick={() => changeSizeDialog(true)}>
                                    <img src={maxsize} alt="Иконка увелечения размера"/>
                                </button>
                        )}
                    <button className={`${s.headerButton} button`} onClick={onHide}>
                        <img src={cross} alt="Иконка закрытия"/>
                    </button>
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    );
});
