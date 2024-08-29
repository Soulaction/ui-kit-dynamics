import {Dropdown} from "../components/Dropdown/Dropdown";
import {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        selectedItem: action('selected')
    },
    argTypes: {
        items: {
            description: "Массив эдементов, которые будут отображаться в выпадающем списке"
        },
        selectItem: {
            description: "Выбранный элемент в списке"
        },
        selectedItem: {
            description: "Функция, которая отрабатывает по выбору элемента"
        },
        placeholder: {
            description: "Надпись указывающая за что отвечает dropdown"
        },
        label: {
            description: "Указывает какое поле в объекте будет отбражено"
        },
        value: {
            description: "Указывает на поле в обекте, которое будет выбрано как значение"
        },
        styles: {
            description: "Стили обёртки выпадающего списка"
        }
    }

} as Meta<typeof Dropdown>

type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
    args: {
        label: 'name',
        value: 'valuе',
        items: [
            {name: 'Значение 1', valuе: 1},
            {name: 'Значение 2', valuе: 2},
        ]
    }
};
