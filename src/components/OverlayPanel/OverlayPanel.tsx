import React, {FC, forwardRef, ReactNode, useEffect, useImperativeHandle, useState} from 'react';
import * as s from './OverlayPanel.module.css';

type OverlayPanelProps = {
    children?: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}

export type ForwardRefType = {
    show: (event) => void
}


export const OverlayPanel: FC<OverlayPanelProps> = forwardRef<ForwardRefType, OverlayPanelProps>(
    ({children}, ref) => {

        const [isOpen, setIsOpen] = useState(false);

        useEffect(() => {

        }, []);

        useImperativeHandle<ForwardRefType, ForwardRefType>(ref, () => {
            return {
                show
            }
        })

        const show = (event) => {

        }

        const hide = () => {

        }

        return (
            <div className={s.panel}>
                {children}
            </div>
        );
    });