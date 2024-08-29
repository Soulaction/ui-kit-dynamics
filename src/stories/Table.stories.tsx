import React, {useRef, useState} from "react";
import {Meta, StoryObj} from "@storybook/react";
import {Table} from "../components/Table/Table";
import {ContextMenu, ContextMenuRef, MenuItem} from "../components/ContextMenu/ContextMenu";

export default {
    title: 'Components/Table',
    component: Table,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Компонента таблицы',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        column: {
            control: 'object',
            description: "Шапка таблицы " +
                "(header - название в колонке, " +
                "field - поле в объекте value, которое соответствует текущей колонке, " +
                "templateBody - шаблон отображения ячеек)"
        },
        value: {
            control: 'object',
            description: "Массив значений в таблице"
        },
        contextMenuRef: {
            description: "ref на компоненту ContextMenu"
        },
        selectedItem: {
            control: 'object',
            description: "Выбранная строка"
        },
        tableStyle: {
            control: 'object',
            description: "Стили таблицы"
        }
    }

} as Meta<typeof Table>

type Story = StoryObj<typeof Table>;

const TableHook = (args) => {
    const contextRef = useRef<ContextMenuRef>(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const contextItems: MenuItem[] = [
        {label: 'Добавть', command: () => console.log('Добавть')},
        {label: 'Удалить', command: () => console.log('Удалить')},
    ]

    return (
        <>
            <ContextMenu ref={contextRef} items={contextItems}/>
            <Table {...args}
                   contextMenuRef={contextRef}
                   selectedItem={selectedRow}
                   changeSelectedItem={setSelectedRow}/>
        </>
    )
}

export const Primary: Story = {
    args: {
        column: [{header: 'Имя', field: 'name'}, {header: 'Возраст', field: 'age'}],
        value: [{name: 'Дима', age: 24}, {name: 'Ирина', age: 26}]
    },
    render: (args) => <TableHook {...args}/>
};
