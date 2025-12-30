import {CSSProperties, SyntheticEvent, useLayoutEffect} from 'react';
import * as s from './Table.module.css'
import {ContextMenuRef} from "../ContextMenu/ContextMenu";

interface TableProps {
    column: Column[];
    value: any[];
    rowKey: string;
    contextMenuRef?: { current: ContextMenuRef };
    selectedItem?: any;
    changeSelectedItem?: (data: any) => void;
    tableStyle?: CSSProperties | undefined;
}

export type Column = {
    header: string;
    field: string;
    templateCell?: (data?: unknown) => React.ReactNode;
}

export const Table = ({
                          selectedItem,
                          contextMenuRef,
                          changeSelectedItem,
                          rowKey,
                          value = [],
                          tableStyle,
                          column = []
                      }: TableProps) => {

    useLayoutEffect(() => {
        if (!rowKey) {
            console.warn('Enter the rowKey');
        }
    }, [rowKey, value]);

    const comparison = (selected: any, object: any): boolean => {
        if (!selected || !object) {
            return false;
        }

        for (const [key, val] of Object.entries(selected)) {
            if (object[key] !== val) {
                return false;
            }
        }
        return true;
    }

    const howContextMenu = (evt: SyntheticEvent, val) => {
        if (contextMenuRef?.current) {
            changeSelectedItem && changeSelectedItem(val)
            contextMenuRef.current.show(evt);
        }
    }

    return (
        <table className={s.table} style={tableStyle}>
            <thead>
            <tr>
                {column.map(col => <th key={col.field} className={s.th}>{col.header}</th>)}
            </tr>
            </thead>
            <tbody>
            {value.map((val, index) =>
                <tr key={val[rowKey] ?? index} className={comparison(selectedItem, val) ? s.selected : ''}
                    onContextMenu={(evt) => howContextMenu(evt, val)}>
                    {column.map(col =>
                        <td className={s.td} key={col.field}>
                            {col.templateCell ? col.templateCell(val) : val[col.field]}
                        </td>
                    )}
                </tr>
            )}
            </tbody>
        </table>
    );
};
