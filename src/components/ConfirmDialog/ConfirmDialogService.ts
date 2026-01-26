import {ConfirmDialogInfo, ListenerList} from "./type/ConfirmDialogTypes";

export class ConfirmDialogService {
    listenerList: ListenerList | null = null;

    showConfirmDialog(confirmDialogInfo: ConfirmDialogInfo) {
        if (!this.listenerList) {
            throw new Error('Not have listener list!');
        }
        this.listenerList(confirmDialogInfo);
    }

    listenerConfirm(listener: ListenerList) {
        this.listenerList = listener;
    }

    unsub() {
        this.listenerList = null;
    }
}

const confirmDialogService = new ConfirmDialogService();

const showConfirmDialog = confirmDialogService.showConfirmDialog.bind(confirmDialogService);
const listenerConfirm = confirmDialogService.listenerConfirm.bind(confirmDialogService);
const unsub = confirmDialogService.unsub.bind(confirmDialogService);

export {listenerConfirm, showConfirmDialog, unsub};