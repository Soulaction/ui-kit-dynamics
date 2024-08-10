import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Button} from '../components/Button/Button';

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onClick: action('button-click')
    },
    argTypes: {
        label: {
            description: "Название внутри кнопки"
        },
        size: {
            description: "Размер кнопки"
        },
        typeButton: {
            description: "Тип кнопки"
        },
        disabled: {
            description: "Признак того, заблокирована или нет"
        },
        onClick: {
            description: "Функция, которая отрабатывает по клику на кнопку"
        }
    }
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        label: 'Button',
        disabled: false,
    },
};
