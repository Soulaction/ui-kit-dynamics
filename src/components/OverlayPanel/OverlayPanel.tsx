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
    hide: (event: SyntheticEvent<HTMLElement>) => void,
    toggle: (event: SyntheticEvent<HTMLElement>) => void,
}

const resetPosition = {left: '0', top: '0'};


export const OverlayPanel: FC<OverlayPanelProps> = forwardRef<OverlayRefType, OverlayPanelProps>(
    ({
         children,
     }, ref) => {

        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
        const [coordinatesOverlay, setCoordinatesOverlay] = useState<CoordinatesOverlay>(resetPosition);
        const overlayPanel = useRef<HTMLDivElement | null>(null);

        const hide = (event: SyntheticEvent<HTMLElement>) => {
            hideLocal(event.target as HTMLElement);
        }

        const hideLocal = (event: Node) => {
            if (overlayPanel.current
                && !overlayPanel.current.contains(event)) {
                setIsOpen(false);
                setCoordinatesOverlay(resetPosition);
            }
        }

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
                setTargetElement(htmlElement);
                setIsOpen(true);
                setTimeout(() => {
                    setCoordinatesOverlay(calcPosition(htmlElement, overlayPanel.current!));
                    document.addEventListener('click', (event: PointerEvent) => hideLocal(event.target as HTMLElement), {once: true});
                });
            }
        }

        const toggle = (event: SyntheticEvent<HTMLElement>) => {
            if (isOpen) {
                hide(event);
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