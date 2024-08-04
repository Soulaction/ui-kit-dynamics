export type ToastRef = {
    show: (message: Message) => void;
}

export type ToastProps = {
    position?: 'top left' | 'top center' | 'top right' | 'bottom right';
}

export type Message = {
    id?: number | undefined;
    severity: SeverityType | undefined;
    summary: string | undefined;
    detail?: string | undefined;
    life?: number | undefined;
}

export type SeverityType = 'success' | 'info' | 'error';
