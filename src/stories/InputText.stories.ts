import {action} from "@storybook/addon-actions";
import {Meta, StoryObj} from "@storybook/react";
import InputText from "../components/InputText/InputText";

export default {
    title: 'Components/InputText',
    component: InputText,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                story: 'Компонента для ввода данных',
            },
        },
    },
    tags: ['autodocs'],
    args: {
        onChange: action('Произошло изменение')
    },
    argTypes: {
        value: {
            control: 'text',
            description: "Значение, которое введено в поле ввода"
        },
        size: {
            control: {type: 'radio', labels: {small: 'Маленькая'}},
            description: "Размер поля ввода"
        },
        valid: {
            description: "Указывает на то, что валидное значение, либо нет"
        },
        disabled: {
            description: "Валидное поле, либо нет"
        }
    }

} as Meta<typeof InputText>

type Story = StoryObj<typeof InputText>;

export const Primary: Story = {
    args: {
        disabled: false,
        valid: true
    }
};
