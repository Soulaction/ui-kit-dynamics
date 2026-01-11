import {iconMap} from "../icon-map";

export type  SVGProps = {
    size?: number;
    color?: string;
}

export type IconProps = {
    name: IconName;
} & SVGProps;

export type IconName = keyof typeof iconMap;