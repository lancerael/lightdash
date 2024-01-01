import { ButtonProps, TooltipProps } from '@mantine/core';
import { PropsWithChildren } from 'react';

/**
 * Props for FilterButton component.
 */
export type FilterButtonProps = PropsWithChildren<{
    /**
     * Specifies whether the tooltip should be disabled.
     */
    isTooltipDisabled?: boolean;

    /**
     * Content to be displayed inside the tooltip. It can be JSX.Element or false to disable the tooltip content.
     */
    tooltipContent?: JSX.Element | string | false;

    /**
     * Callback function to be executed on button click.
     */
    onClick: () => void;

    /**
     * Additional props for the tooltip component.
     */
    tooltipProps?: Partial<TooltipProps>;

    /**
     * Additional props for the button component.
     */
    buttonProps?: Partial<ButtonProps>;
}>;
