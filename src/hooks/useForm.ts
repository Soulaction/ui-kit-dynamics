import {MutableRefObject, SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";

export interface FormControl<K> {
    register: (controlName: string, validateOption: ValidateOption[]) => ControlProperty;
    formState: FormState<K>;
    reset: (element: SyntheticEvent) => void;
    isValid: boolean;
}

type ValidateOption =
    | { required: boolean; message: string }
    | { min: number; message: string }
    | { max: number; message: string }
    | { minLength: number; message: string }
    | { maxLength: number; message: string }
    | { pattern: string; message: string };

export interface ControlProperty {
    onChange: (element: SyntheticEvent) => void;
    onBlur: (element: SyntheticEvent) => void;
    name: string;
    value: string;
}

export type FormState<K> = {
    values: {
        [key in keyof K]: string | null;
    };
    errors: {
        [key in keyof K]: string[] | null;
    }
}

const validate = (value: string, controlName: string, validateOption: ValidateOption[]): FormState<any> => {
    if (value === undefined) {
        throw new Error('Not Value')
    }
    const newFormState: FormState<any> = {values: {}, errors: {}};
    newFormState.values = {...newFormState.values, [controlName]: value};
    newFormState.errors = {...newFormState.errors, [controlName]: []};

    validateOption.forEach((options) => {
        if ('required' in options && !value) {
            newFormState.errors[controlName]!.push(options.message)
        }
        if ('min' in options && parseInt(value) < options.min) {
            newFormState.errors[controlName]!.push(options.message)
        }
        if ('max' in options && parseInt(value) > options.max) {
            newFormState.errors[controlName]!.push(options.message)
        }
        if ('minLength' in options && value.length < options.minLength) {
            newFormState.errors[controlName]!.push(options.message)
        }
        if ('maxLength' in options && value.length > options.maxLength) {
            newFormState.errors[controlName]!.push(options.message)
        }
        if ('pattern' in options && !(new RegExp(options.pattern).test(value))) {
            newFormState.errors[controlName]!.push(options.message)
        }

    })
    !newFormState!.errors[controlName]!.length && (newFormState.errors[controlName] = null);
    return newFormState;
}

const initialize = <T>(form: HTMLFormElement, initObj: T | null | undefined): FormState<T> => {

    let dataForm = {};
    let formState: FormState<T> = {values: {}, errors: {}} as FormState<T>;
    Array.from(form.elements).forEach(el => {
        if (el instanceof HTMLInputElement) {
            dataForm[el.name] = el.value;
        }
    })

    for (const key of Object.keys(dataForm)) {
        if (initObj && initObj[key]) {
            formState.values = {...formState.values, [key]: initObj[key]};
        } else {
            formState.values = {...formState.values, [key]: ''};
        }
    }
    return formState;
}

const changeData = (data: SyntheticEvent | string, controlName: string, validateOption: ValidateOption[], setFormState: (data: any) => void): void => {
    if (typeof data !== 'string' && data.target instanceof HTMLInputElement) {
        const newFormState: FormState<any> = validate(data.target.value, controlName, validateOption);
        setFormState(oldState => ({
            values: {...oldState.values, ...newFormState.values},
            errors: {...oldState.errors, ...newFormState.errors}
        }));
    } else if (typeof data === 'string') {
        const newFormState: FormState<any> = validate(data, controlName, validateOption);
        setFormState(oldState => ({
            values: {...oldState.values, ...newFormState.values},
            errors: {...oldState.errors, ...newFormState.errors}
        }));
    }
}

const checkForm = (refHTMLForm: MutableRefObject<HTMLFormElement>) => {
    if (!refHTMLForm) throw new Error('refHTMLForm not find');
    if (!refHTMLForm.current) throw new Error('Form not find');
}

export const useForm = <T>(refHTMLForm: MutableRefObject<HTMLFormElement>, initObj?: T): FormControl<T> => {
    const [formState, setFormState] = useState<FormState<T>>({values: {}, errors: {}} as FormState<T>);

    useEffect(() => {
        if (!refHTMLForm.current.name) {
            refHTMLForm.current.name = Date.now().toString();
        }
        refHTMLForm.current.noValidate = true;
        setFormState(initialize(refHTMLForm.current, initObj));
    }, [])

    const register = (controlName: string, validateOption: ValidateOption[]): ControlProperty => {
        const onChange = (data: SyntheticEvent | string) => {
            changeData(data, controlName, validateOption, setFormState);
        }
        const onBlur = (data: SyntheticEvent | string) => {
            changeData(data, controlName, validateOption, setFormState);
        }

        return {name: controlName, value: formState.values[controlName] || '', onChange, onBlur};
    }

    const reset = useCallback((evt: SyntheticEvent) => {
        evt.preventDefault();
        refHTMLForm.current.reset();
        setFormState(initialize<T>(refHTMLForm.current, null));
    }, []);

    const checkValidForm = useCallback(() => {
        try {
            checkForm(refHTMLForm);
            return refHTMLForm.current.checkValidity()
        } catch {
            return false;
        }
    }, []);

    return {formState, register, reset, isValid: checkValidForm()};

}
