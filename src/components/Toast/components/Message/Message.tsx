import React from 'react';
import s from './Message.module.css'
import {Message as MessageType} from "../../types/Message";
import cross from "../../../../assets/cross.svg";
import check from "../../../../assets/check.svg";
import info from "../../../../assets/info.svg";
import error from "../../../../assets/error.svg";

interface MessageProps {
    messageInfo: MessageType;
    onHide: () => void;
}

interface ConfigMsg {
    color: string;
    background: string;
    img: string;
}

// @TODO надо поправить отображение иконок
const Message = ({messageInfo, onHide}: MessageProps) => {

    const config: ConfigMsg = {color: '', img: '', background: ''};

    if(!(messageInfo.severity && (messageInfo.summary || messageInfo.detail))) {
        return null;
    }

    switch (messageInfo.severity) {
        case 'success':
            config.color = '#1ea97c';
            config.background = 'rgba(228, 248, 240, 0.9)';
            config.img = check;
            break;
        case 'info':
            config.color = '#3b82f6';
            config.background = 'rgba(219, 234, 254, 0.9)';
            config.img = info;
            break;
        case 'error':
            config.color = '#ff5757';
            config.background = 'rgba(255, 231, 230, 0.9)';
            config.img = error;
            break;
    }

    return (
        <div className={s.message} style={{background: config.background, color: config.color}}>

            <div className={s.iconContainer} style={{backgroundColor: config.color, maskImage: `url(${config.img})`}}
                 aria-label="Иконка статуса">
            </div>
            <div className={s.content}>
                <h1 className={s.summary}>{messageInfo.summary}</h1>
                <p className={s.detail}>{messageInfo.detail}</p>
            </div>
            <button className={s.closeButton + ' button'} onClick={onHide}>
                <img src={cross} alt="Иконка закрытия"/>
            </button>
        </div>
    );
};

export default Message;
