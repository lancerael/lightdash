import type { Meta, StoryObj } from '@storybook/react';
import FilterButton from './FilterButton';

const meta: Meta<typeof FilterButton> = {
    title: 'FilterButton',
    component: FilterButton,
    argTypes: {
        children: {
            control: 'text',
        },
        tooltipContent: {
            control: 'text',
        },
        isTooltipDisabled: {
            control: 'boolean',
        },
        onClick: { action: 'clicked' },
    },
    tags: ['autodocs'],
};

/**
 * Default button
 */
export const Default: StoryObj<typeof FilterButton> = {
    args: {
        children: 'Standard Button',
        tooltipContent: 'Tooltip Text',
        isTooltipDisabled: false,
    },
};

/**
 * With tooltip disabled
 */
export const NoTooltip: StoryObj<typeof FilterButton> = {
    args: {
        children: 'Button With No Tooltip',
        tooltipContent: 'Tooltip Text',
        isTooltipDisabled: true,
    },
};

/**
 * With outline
 */
export const WithOutline: StoryObj<typeof FilterButton> = {
    args: {
        children: 'Button With Outline',
        tooltipContent: 'Tooltip Text',
        buttonProps: {
            variant: 'outline',
        },
    },
};

export default meta;
