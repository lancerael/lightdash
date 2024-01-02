import { Button, Text, Tooltip } from '@mantine/core';
import { forwardRef } from 'react';
import { FilterButtonProps } from './FilterButton.types';

/**
 * FilterButton component displays a button with an optional tooltip.
 *
 * @component
 * @example
 * // Example usage:
 * <FilterButton
 *    isTooltipDisabled={true}
 *    tooltipContent={<div>Tooltip Content</div>}
 *    onClick={() => console.log('Button clicked')}
 *    tooltipProps={{ duration: 200 }}
 *    buttonProps={{ disabled: true }}
 * >
 *    Click me
 * </FilterButton>
 *
 * @param {FilterButtonProps} props - The properties of the FilterButton component.
 * @returns {JSX.Element} - The rendered FilterButton component.
 */
const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
    (
        {
            isTooltipDisabled,
            tooltipContent,
            onClick,
            tooltipProps,
            buttonProps,
            children,
        }: FilterButtonProps,
        ref,
    ) => {
        return (
            <Tooltip
                disabled={isTooltipDisabled || !tooltipContent}
                position="top-start"
                offset={0}
                arrowOffset={16}
                label={<Text fz="xs">{tooltipContent}</Text>}
                {...tooltipProps}
                withArrow
            >
                <Button
                    size="xs"
                    mr="xxs"
                    variant="default"
                    bg="white"
                    styles={{
                        inner: {
                            color: 'black',
                        },
                    }}
                    {...{ ref, onClick, ...buttonProps }}
                >
                    <Text>{children}</Text>
                </Button>
            </Tooltip>
        );
    },
);

export default FilterButton;
