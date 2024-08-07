import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Dialog} from "../components/Dialog/Dialog";
import {Button} from "../components/Button/Button";
import React, {useState} from 'react';

export default {
    title: 'Components/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        header: 'Button',
        visible: true,
        draggable: true,
        maximizable: true,
        children: <p>Lorem ipsum dolor sit amet.</p>,
        onHide: action('button-click')
    },
    argTypes: {
        header: {
            description: 'Добавляет заголовок в шапку модального окна',
        },
        visible: {
            description: 'Отвечает за видимость модального окна',
        },
        onHide: {
            description: 'Функция по закрытию модального окна',
        },
        style: {
            description: 'Стили модального окна',
        },
        maximizable: {
            description: 'Кнопка для увеличения во весь экран',
        },
        draggable: {
            description: 'Указывает на возможность перетягивания',
        },
        children: {
            control: {disable: true},
            description: 'Позволяет передавать контент в виде jsx внутрь модального окна',
        }
    },
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

const DialogHooks = (args) => {
    const [isVisible, setVisible] = useState(false);

    return (
        <>
            <Button label={'Модальное окно'} onClick={() => setVisible(true)}/>
            <Dialog {...args} visible={isVisible} onHide={() => setVisible(false)}></Dialog>
        </>
    );
};

export const Primary: Story = {
    render: (args) => <DialogHooks {...args}></DialogHooks>
};
