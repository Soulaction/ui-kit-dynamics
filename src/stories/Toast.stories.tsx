import React, {useRef} from "react";
import {Meta, StoryObj} from "@storybook/react";
import {Toast} from "../components/Toast/Toast";
import {ToastRef} from "../components/Toast/types/Message";
import {Button} from "../components/Button/Button";

export default {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: "Компонента, позволяющая отображать уведомления, имеет статический метод show",
            },
        },
    },
    args: {
        position: 'top right',
        summary: 'Зоголовок',
        detail: 'Подробная информация',
        life: 5000,
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
            options: ["top right", "bottom right", "top left", "center center"],
            description: "Указывает позицию, где будет отображаться сообщение"
        },
        severity: {
            control: {type: 'select'},
            options: ['success', 'info', 'error'],
            description: "Тип сообщения"
        },
        summary: {
            control: 'text',
            description: "Заголовок уведомленя"
        },
        detail: {
            control: 'text',
            description: "Подробное описание уведомления"
        },
        life: {
            control: 'number',
            description: "Время отображения уведомления (ms)"
        },

    }

} as Meta<typeof Toast>

type Story = StoryObj<typeof Toast>;

const ToastHook = (args) => {
    const toastRef = useRef<ToastRef>(null);

    const showMessage = () => {
        toastRef.current.show({
            severity: args.severity,
            summary: args.summary,
            detail: args.detail,
            life: args.life
        })
    }

    return (
        <>
            <Button onClick={() => showMessage()} label="Показать уведомление"/>
            <Toast ref={toastRef} position={args.position}/>
        </>
    )
}

export const Primary: Story = {
    render: (args) => <ToastHook {...args}/>
};
