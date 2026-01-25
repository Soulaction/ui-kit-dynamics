import React, {useEffect, useState} from 'react';
import {Dialog} from "../Dialog/Dialog";
import {listenerConfirm, unsub} from './ConfirmDialogService';
import {ConfirmDialogInfo} from "./type/ConfirmDialogTypes";
import {Button} from "../../index";

export const ConfirmDialog = () => {
    const [confirmDialogInfo, setConfirmDialogInfo] = useState<ConfirmDialogInfo | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        listenerConfirm((confirmInfo) => setConfirmDialogInfo(confirmInfo));
        setIsVisible(true);
        return unsub;
    }, []);

    const acceptClick = () => {
        if(confirmDialogInfo) {
            confirmDialogInfo.accept();
        }
        setIsVisible(false);
    }

    const rejectClick = () => {
        if(confirmDialogInfo) {
            confirmDialogInfo.reject();
        }
        setIsVisible(false);
    }

    return (
        <Dialog visible={isVisible}
                header={confirmDialogInfo?.header ?? ''}
                onHide={() => setIsVisible(false)}>
            <div>
                {confirmDialogInfo?.message}
            </div>
            <div>
                <Button label="Нет"
                        typeButton="primary"
                        onClick={rejectClick}/>
                <Button label="Да"
                        typeButton={(confirmDialogInfo?.defaultFocus ?? '') === 'reject' ? 'danger' : 'primary'}
                        onClick={acceptClick}/>
            </div>
        </Dialog>
    );
};
