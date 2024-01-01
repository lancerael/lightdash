import {
    applyDefaultTileTargets,
    Dashboard,
    DashboardFilterRule,
    FilterableField,
} from '@lightdash/common';
import { CloseButton, Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons-react';
import { FC, useCallback } from 'react';
import useSanitisedMemo from '../../hooks/useSanitisedMemo';
import { useDashboardContext } from '../../providers/DashboardProvider';
import {
    getConditionalRuleLabel,
    getFilterRuleTables,
} from '../common/Filters/FilterInputs';
import MantineIcon from '../common/MantineIcon';
import FilterButton from './FilterButton';
import FilterConfiguration from './FilterConfiguration';

type Props = {
    isEditMode: boolean;
    isCreatingNew?: boolean;
    isTemporary?: boolean;
    field?: FilterableField;
    filterRule?: DashboardFilterRule;
    onSave?: (value: DashboardFilterRule) => void;
    onUpdate?: (filter: DashboardFilterRule) => void;
    onRemove?: () => void;
};

const Filter: FC<Props> = ({
    isEditMode,
    isCreatingNew,
    isTemporary,
    field,
    filterRule,
    onSave,
    onUpdate,
    onRemove,
}) => {
    const {
        dashboard,
        dashboardTiles,
        allFilterableFields,
        filterableFieldsByTileUuid,
        isLoadingDashboardFilters,
        isFetchingDashboardFilters,
    } = useDashboardContext((c) => c);

    const [isPopoverOpen, { close: closePopover, toggle: togglePopover }] =
        useDisclosure();

    const [isSubPopoverOpen, { close: closeSubPopover, open: openSubPopover }] =
        useDisclosure();

    const filterByOriginalRule = useCallback(
        (target: Dashboard, rule: DashboardFilterRule) => {
            return target.filters.dimensions.find(
                (item: DashboardFilterRule) => item.id === rule.id,
            );
        },
        [],
    );

    // Only used by active filters
    const originalFilterRule = useSanitisedMemo(filterByOriginalRule, [
        dashboard!,
        filterRule!,
    ]);

    const defaultFilterRule = useSanitisedMemo(applyDefaultTileTargets, [
        filterRule!,
        field!,
        filterableFieldsByTileUuid!,
    ]);

    const filterRuleLabels = useSanitisedMemo(getConditionalRuleLabel, [
        filterRule!,
        field!,
    ]);

    const filterRuleTables = useSanitisedMemo(getFilterRuleTables, [
        filterRule!,
        field!,
        allFilterableFields!,
    ]);

    const handleClose = useCallback(() => {
        closeSubPopover();
        closePopover();
    }, [closeSubPopover, closePopover]);

    const handleSaveChanges = useCallback(
        (newRule: DashboardFilterRule) => {
            if (isCreatingNew && onSave) {
                onSave(newRule);
            } else if (onUpdate) {
                onUpdate(newRule);
            }
            handleClose();
        },
        [isCreatingNew, onSave, onUpdate, handleClose],
    );

    const isPopoverDisabled =
        !filterableFieldsByTileUuid || !allFilterableFields;

    /**
     * Props for the new filter button
     */
    const newFilter = {
        tooltipContent: (
            <>
                Only filters added in{' '}
                <Text span fw={600}>
                    'edit'
                </Text>{' '}
                mode will be saved
            </>
        ),
        buttonContent: 'Add filter',
        buttonProps: {
            leftIcon: <MantineIcon color="blue" icon={IconFilter} />,
            disabled: !allFilterableFields,
            loading: isLoadingDashboardFilters || isFetchingDashboardFilters,
        },
    };

    /**
     * Props for the existing filter button
     */
    const existingFilter = {
        tooltipContent: !!filterRuleTables && (
            <>
                <>{filterRuleTables?.length === 1 ? 'Table: ' : 'Tables: '}</>{' '}
                <Text span fw={600}>
                    {filterRuleTables?.join(', ')}
                </Text>
            </>
        ),
        buttonContent: (
            <>
                <>{filterRule?.label || filterRuleLabels?.field}</>{' '}
                {filterRule?.disabled ? (
                    <Text span color="gray.6">
                        is any value
                    </Text>
                ) : (
                    <>
                        <Text span color="gray.7">
                            {filterRuleLabels?.operator}
                        </Text>{' '}
                        <Text fw={700} span>
                            {filterRuleLabels?.value}
                        </Text>
                    </>
                )}
            </>
        ),
        buttonProps: {
            rightIcon: (isEditMode || isTemporary) && (
                <CloseButton size="sm" onClick={onRemove} />
            ),
            variant: isTemporary ? 'outline' : 'default',
        },
    };

    const { buttonContent, ...filterButtonProps } = isCreatingNew
        ? newFilter
        : existingFilter;

    return (
        <Popover
            position="bottom-start"
            trapFocus
            opened={isPopoverOpen}
            closeOnEscape={!isSubPopoverOpen}
            closeOnClickOutside={!isSubPopoverOpen}
            onClose={handleClose}
            disabled={isPopoverDisabled}
            transitionProps={{
                transition: 'pop',
            }}
            withArrow
            shadow="md"
            offset={-1}
        >
            <Popover.Target>
                <FilterButton
                    isTooltipDisabled={
                        isPopoverOpen || (!isCreatingNew && isEditMode)
                    }
                    onClick={togglePopover}
                    {...filterButtonProps}
                >
                    {buttonContent}
                </FilterButton>
            </Popover.Target>

            <Popover.Dropdown ml={5}>
                {filterableFieldsByTileUuid && dashboardTiles && (
                    <FilterConfiguration
                        {...{
                            isCreatingNew,
                            isEditMode,
                            isTemporary,
                            field,
                            originalFilterRule,
                            defaultFilterRule,
                        }}
                        fields={allFilterableFields || []}
                        tiles={dashboardTiles}
                        availableTileFilters={filterableFieldsByTileUuid}
                        onSave={handleSaveChanges}
                        popoverProps={{
                            onOpen: openSubPopover,
                            onClose: closeSubPopover,
                        }}
                    />
                )}
            </Popover.Dropdown>
        </Popover>
    );
};

export default Filter;
