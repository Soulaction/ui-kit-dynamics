import {Meta, StoryObj} from "@storybook/react";
import {ContextMenu, ContextMenuRef} from "../components/ContextMenu/ContextMenu";
import React, {useRef} from "react";

export default {
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
} as Meta<typeof ContextMenu>;

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
