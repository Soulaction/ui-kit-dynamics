import React, {CSSProperties, memo, ReactNode, SyntheticEvent, useEffect} from 'react';
import s from './Table.module.css'
import {ContextMenuRef} from "../ContextMenu/ContextMenu";

interface TableProps {
    column: Column[];
    value: any[];
    contextMenuRef?: { current: ContextMenuRef };
    selectedItem?: any;
    changeSelectedItem?: (data: any) => void;
    tableStyle?: CSSProperties | undefined;
}

export interface Column {
    header: string;
    field: string;
    templateBody?: ReactNode | ((data: any) => React.ReactNode);
}

export const Table = ({selectedItem, contextMenuRef, changeSelectedItem, value = [], tableStyle, column = []}: TableProps) => {

    console.log('Table', );

    useEffect(() => {
        console.log('useEffect Table');
    }, []);

    const renderTemplateBody = (templateBody: ReactNode | ((data: any) => React.ReactNode), value: any): ReactNode => {
        if (typeof templateBody === 'function') {
            return templateBody(value);
        } else {
            return templateBody;
        }
    }

    const comparison = (selected: any, object: any): boolean => {
        if (!selected || !object) {
            return false;
        }
        const manyKeyObj = Object.keys(selected) > Object.keys(object) ? selected : object;

        for (const [key, val] of Object.entries(manyKeyObj)) {
            if (selected[key] !== val) {
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
            {value.map(val =>
                <tr key={Object.values(val).join()} className={comparison(selectedItem, val) ? s.selected : ''}
                    onContextMenu={(evt) => howContextMenu(evt, val)}>
                    {column.map(col =>
                        <td className={s.td} key={col.field}>
                            {col.templateBody ? renderTemplateBody(col.templateBody, val[col.field]) : val[col.field]}
                        </td>
                    )}
                </tr>
            )}
            </tbody>
        </table>
    );
};
