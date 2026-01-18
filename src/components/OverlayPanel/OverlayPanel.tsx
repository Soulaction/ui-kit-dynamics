import React, {
    FC,
    forwardRef,
    ReactNode,
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
    SyntheticEvent
} from 'react';
import * as s from './OverlayPanel.module.css';
import {createPortal} from "react-dom";


type OverlayPanelProps = {
    children?: ReactNode;
}

type CoordinatesOverlay = {
    top: string;
    left: string;
}

export type OverlayRefType = {
    show: (event: SyntheticEvent<HTMLElement>) => void,
    hide: () => void,
    toggle: (event: SyntheticEvent<HTMLElement>) => void,
}

const resetPosition = {left: '0', top: '0'};


export const OverlayPanel: FC<OverlayPanelProps> = forwardRef<OverlayRefType, OverlayPanelProps>(
    ({
         children,
     }, ref) => {

        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [coordinatesOverlay, setCoordinatesOverlay] = useState<CoordinatesOverlay>(resetPosition);
        const overlayPanel = useRef<HTMLDivElement | null>(null);

        const hide = () => {
            setIsOpen(false);
            setCoordinatesOverlay(resetPosition);
        }

        useEffect(() => {
            const {top, left} = coordinatesOverlay;
            const eventListenerCallback = (event: PointerEvent) => {
                if (overlayPanel.current
                    && !overlayPanel.current.contains(event.target as HTMLElement)) {
                    setIsOpen(false);
                    setCoordinatesOverlay(resetPosition);
                }
            }

            if (Number(top) + Number(left) !== 0) {
                document.addEventListener('click', eventListenerCallback);
            }
            return () => document.removeEventListener('click', eventListenerCallback);
        }, [coordinatesOverlay]);

        useImperativeHandle<OverlayRefType, OverlayRefType>(ref, () => {
            return {
                show,
                hide,
                toggle
            }
        })

        const show = (htmlEvent: SyntheticEvent<HTMLElement>) => {
            const htmlElement = htmlEvent.currentTarget;
            if (htmlElement) {
                setIsOpen(true);
                setTimeout(() => {
                    if (overlayPanel.current) {
                        setCoordinatesOverlay(calcPosition(htmlElement, overlayPanel.current));
                    }
                });
            }
        }

        const toggle = (event: SyntheticEvent<HTMLElement>) => {
            if (isOpen) {
                hide();
            } else {
                show(event);
            }
        }

        const calcPosition = (elTarget: HTMLElement, elOverlay: HTMLElement): CoordinatesOverlay => {
            let x, y;

            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;

            const {x: xTarget, y: yTarget, width: widthTarget, height: heightTarget} = elTarget.getBoundingClientRect();
            const {width: widthOverlay, height: heightOverlay} = elOverlay.getBoundingClientRect();

            if (screenWidth > xTarget + widthOverlay && screenHeight > yTarget + heightOverlay) {
                x = xTarget;
                y = yTarget + heightTarget;
            } else if (0 < xTarget + widthTarget - widthOverlay && screenHeight > yTarget + heightOverlay) {
                x = xTarget + widthTarget - widthOverlay;
                y = yTarget + heightTarget;
            } else if (screenWidth > xTarget + widthOverlay && 0 < yTarget - heightOverlay) {
                x = xTarget;
                y = yTarget - heightOverlay;
            } else if (0 < xTarget + widthTarget - widthOverlay && 0 < yTarget - heightOverlay) {
                x = xTarget + widthTarget - widthOverlay;
                y = yTarget - heightOverlay;
            } else {
                x = xTarget;
                y = yTarget - heightTarget;
            }

            return {top: y + 'px', left: x + 'px'};
        }

        if (isOpen) {
            const {top, left} = coordinatesOverlay;

            return createPortal(
                <div className={s.panel}
                     style={{
                         opacity: Number(top) + Number(left) === 0 ? 0 : 1,
                         ...coordinatesOverlay
                     }}
                     ref={overlayPanel}>
                    {children}
                </div>,
                document.body
            )
        } else {
            return null;
        }
    });