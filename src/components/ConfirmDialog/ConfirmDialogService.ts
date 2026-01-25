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

const {showConfirmDialog, listenerConfirm, unsub} = confirmDialogService;
export {listenerConfirm, showConfirmDialog, unsub};