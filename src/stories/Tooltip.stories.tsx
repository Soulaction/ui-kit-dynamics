import React, {useRef} from "react";
import {Meta, StoryObj} from "@storybook/react";
import {Tooltip} from "../components/Tooltip/Tooltip";

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: "Компонента, для показа подробной информации",
            },
        },
    },
    args: {
        showDelay: 0,
        hideDelay: 0,
        text: 'Tooltip'
    },
    tags: ['autodocs'],
    argTypes: {
        showDelay: {
            control: 'number',
            description: "Задержка после наведения курсора на элемент, на котром должен отображаться Tooltip"
        },
        hideDelay: {
            control: 'number',
            description: "Задержка после отвода курсора от элемента, на котром должен отображаться Tooltip"
        },
        refHTMLElement: {
            control: {disable: true},
            description: "Элемент к которому Tooltip привязан"
        },
        position: {
            description: "Место отображения"
        },
        text: {
            control: 'text',
            description: "Содержимое Tooltip"
        },

    }

} as Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>;

const TooltipHook = (args) => {
    const divRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div ref={divRef}
                style={{width: '100px', height: '100px', background: 'gainsboro'}}/>
            <Tooltip refHTMLElement={divRef} {...args}/>
        </>
    )
}

export const Primary: Story = {
    render: (args) => <TooltipHook {...args}/>
};
