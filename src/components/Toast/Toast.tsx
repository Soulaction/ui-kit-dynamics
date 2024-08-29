import React, {CSSProperties, forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import s from './Toast.module.css';
import {Message, ToastProps, ToastRef} from "./types/Message";
import MessageComponent from "./components/Message/Message";

export const Toast = forwardRef<ToastRef, ToastProps>(({
                                                           position = 'top right'
                                                       }, ref) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const stylePosition: CSSProperties = {};
    console.log('Toast', messages);

    useEffect(() => {
        console.log('useEffect Toast');
    }, []);

    useImperativeHandle<ToastRef, ToastRef>(ref, () => {
        return {
            show
        }
    })

    switch (position) {
        case "top right":
            stylePosition.top = '10px';
            stylePosition.right = '10px';
            break;
        case "bottom right":
            stylePosition.bottom = '10px';
            stylePosition.right = '10px';
            break;
        case "top left":
            stylePosition.top = '10px';
            stylePosition.left = '10px';
            break;
        case "center center":
            stylePosition.top = '50%';
            stylePosition.left = '50%';
            stylePosition.transform = 'translate(-50%, -50%)';
            break;

    }

    const show = (message: Message): void => {
        message.id = message.id ?? (message.id = Date.now());
        console.log(message);
        setMessages([...messages, message]);
        setTimeout(() => {
            deleteMessage(message.id!);
        }, message.life ?? 0);
    }

    const deleteMessage = (id: number): void => {
        setMessages((prevState) => [...prevState.filter((el) => el.id !== id)]);
    }

    return (
        <div className={s.toast} style={stylePosition}>
            {
                messages.map((msg) =>
                    <MessageComponent key={msg.id}
                                      messageInfo={msg}
                                      onHide={() => deleteMessage(msg.id!)}/>
                )
            }
        </div>
    );
});
