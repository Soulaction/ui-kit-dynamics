import {FC} from "react";
import {SVGProps} from "../type/icon-type";

export const MenuBar: FC<SVGProps> = ({color, size}) => (
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" width={size} height={size} color={color}>
        <path stroke="currentColor" d="m40.637 14.67h-31.274a1 1 0 0 1 0-2h31.274a1 1 0 0 1 0 2z"></path>
        <path stroke="currentColor" d="m40.637 26h-31.274a1 1 0 0 1 0-2h31.274a1 1 0 0 1 0 2z"></path>
        <path stroke="currentColor" d="m40.637 37.33h-31.274a1 1 0 0 1 0-2h31.274a1 1 0 0 1 0 2z"></path>
    </svg>
);