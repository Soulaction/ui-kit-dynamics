import {Meta, StoryObj} from "@storybook/react";
import ContextMenu, {ContextMenuRef} from "../components/ContextMenu/ContextMenu";
import {action} from "@storybook/addon-actions";
import React, {useRef} from "react";

const meta: Meta<typeof ContextMenu> = {
    title: 'Components/ContextMenu',
    component: ContextMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        items: {
            description: "Массив элементов списка"
        },
        style: {
            description: "Стили контекстного меню"
        }
    }
};

export default meta;

type Story = StoryObj<typeof ContextHooks>;

const ContextHooks = (args) => {
    const contextMenu = useRef<ContextMenuRef>(null);

    const show = (evt) => {
        contextMenu.current.show(evt)
    };

    return (
        <>
            <div onContextMenu={show} style={{height: '100px', width: '100px', background: 'aqua'}}></div>
            <ContextMenu ref={contextMenu} {...args}/>
        </>
    );
};

export const Primary: Story = {
    args: {
        items: [{label: 'Add', command: () => console.log('Add')}],
        style: {}
    },
    render: (args) => <ContextHooks {...args}></ContextHooks>
};
