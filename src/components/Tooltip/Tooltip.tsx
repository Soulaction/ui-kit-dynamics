import React, {MutableRefObject, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import s from './Tooltip.module.css';

interface TooltipProps {
    showDelay?: number;
    hideDelay?: number;
    refHTMLElement: MutableRefObject<HTMLElement>;
    position?: 'top' | 'right' | 'bottom' | 'left';
    text?: string;
}

export const Tooltip = ({
                     showDelay = 0,
                     hideDelay = 0,
                     refHTMLElement,
                     position = 'right',
                     text
                 }: TooltipProps) => {
    console.log('Tooltip', showDelay);
    const [tooltipContainer] = useState(() => document.createElement('div'));
    const [positionStyle, setPositionStyle] = useState<any>({});
    const [type, setType] = useState<string>('');
    if (!refHTMLElement) {
        return;
    }

    useEffect(() => {
        console.log('useEffect Tooltip', refHTMLElement);

        const targetPosition: { left: number, top: number }[] = [];
        const clientRect: DOMRect = refHTMLElement.current.getBoundingClientRect();
        let timeOutShow;
        let timeOutHide;

        targetPosition.push({
            left: clientRect.left + clientRect.width / 2,
            top: clientRect.top - 5
        });
        targetPosition.push({
            left: clientRect.left + clientRect.width + 5,
            top: clientRect.top + clientRect.height / 2
        });
        targetPosition.push({
            left: clientRect.left + clientRect.width / 2,
            top: clientRect.top + clientRect.height + 5
        });
        targetPosition.push({
            left: clientRect.left - 5,
            top: clientRect.top + clientRect.height / 2
        });

        function show() {
            console.log('show');
            clearTimeout(timeOutHide);
            timeOutShow = setTimeout(() => {
                switch (position) {
                    case 'top':
                        setPositionStyle(targetPosition[0]);
                        setType(s.top);
                        break;
                    case 'right':
                        setPositionStyle(targetPosition[1]);
                        setType(s.right);
                        break;
                    case 'bottom':
                        setPositionStyle(targetPosition[2]);
                        setType(s.bottom);
                        break;
                    case 'left':
                        setPositionStyle(targetPosition[3]);
                        setType(s.left);
                        break;
                }
            }, showDelay)
        }

        function hide() {
            clearTimeout(timeOutShow);
            timeOutHide = setTimeout(() => {
                setType('');
            }, hideDelay);
        }
        document.body.append(tooltipContainer);

        refHTMLElement.current.addEventListener('mouseover', show);
        refHTMLElement.current.addEventListener('mouseleave', hide);

        return () => {
            tooltipContainer.remove();
        }
    }, []);

    return ReactDOM.createPortal(
        type && <div className={s.tooltip + ' ' + type} style={{...positionStyle}}>
            {text}
        </div>,
        tooltipContainer
    );
};
