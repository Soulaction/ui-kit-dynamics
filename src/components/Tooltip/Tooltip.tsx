import React, {memo, MutableRefObject, useEffect, useState} from 'react';
import s from './Tooltip.module.css';

interface TooltipProps {
    showDelay?: number;
    hideDelay?: number;
    refHTMLElement: MutableRefObject<HTMLElement>;
    position?: 'top' | 'right' | 'bottom' | 'left';
    text?: string;
}

const Tooltip = ({
                     showDelay = 0,
                     hideDelay = 0,
                     refHTMLElement,
                     position = 'right',
                     text
                 }: TooltipProps) => {
    console.log('Tooltip');
    const [positionStyle, setPositionStyle] = useState<any>({});
    const [type, setType] = useState<string>('');

    useEffect(() => {
        console.log('useEffect Tooltip');

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

        refHTMLElement.current.addEventListener('mouseover', show);
        refHTMLElement.current.addEventListener('mouseleave', hide);

        return () => {
            refHTMLElement.current.removeEventListener('mouseover', show);
            refHTMLElement.current.removeEventListener('mouseleave', hide);
        };
    }, []);


    return (
        type && <div className={s.tooltip + ' ' + type} style={{...positionStyle}}>
            {text}
        </div>
    );
};

export default memo(Tooltip);
