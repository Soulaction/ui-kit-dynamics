import {FC} from 'react';
import {iconMap} from "./icon-map";
import {IconProps} from "./type/icon-type";

export const Icon: FC<IconProps> = ({name, size = 20, ...props}) => {
    const IconComponent = iconMap[name];
    return <IconComponent size={size} {...props}/>;
};

