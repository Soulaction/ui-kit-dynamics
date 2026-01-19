import {FC} from "react";
import {SVGProps} from "../type/icon-type";

export const Cross: FC<SVGProps> = ({color, size}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} color={color}  fill="none">
        <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor"/>
    </svg>
);