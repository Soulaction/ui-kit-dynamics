import {iconMap} from "../icon-map";

export type  SVGProps = {
    size?: number;
    color?: string;
    className?: string;
}

export type IconProps = {
    name: IconName;
} & SVGProps;

export type IconName = keyof typeof iconMap;