import {ReactNode} from "react";

export type ConfirmDialogInfo = {
    header: string;
    message: ReactNode;
    defaultFocus: 'accept' | 'reject';
    accept: () => void;
    reject: () => void;
}

export type ListenerList = (cDI: ConfirmDialogInfo) => void