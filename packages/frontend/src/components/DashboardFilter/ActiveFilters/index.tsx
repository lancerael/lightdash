import { DashboardFilters } from '@lightdash/common';
import { Group, Skeleton } from '@mantine/core';
import { FC } from 'react';
import { useDashboardContext } from '../../../providers/DashboardProvider';
import Filter from '../Filter';

interface ActiveFiltersProps {
    isEditMode: boolean;
}

const ActiveFilters: FC<ActiveFiltersProps> = ({ isEditMode }) => {
    const {
        dashboardFilters,
        dashboardTemporaryFilters,
        fieldsWithSuggestions,
        isLoadingDashboardFilters,
        isFetchingDashboardFilters,
        removeDimensionDashboardFilter,
        updateDimensionDashboardFilter,
    } = useDashboardContext((c) => c);

    if (isLoadingDashboardFilters || isFetchingDashboardFilters) {
        return (
            <Group spacing="xs" ml="xs">
                {Array.from({ length: 5 }, (_, i) => (
                    <Skeleton h={30} w={100} radius={4} key={i} />
                ))}
            </Group>
        );
    }

    if (!fieldsWithSuggestions) return null;

    const getMappedFilters = (
        filters: DashboardFilters,
        isTemporary: boolean = false,
    ) => {
        return filters.dimensions
            .filter((item) => !!fieldsWithSuggestions[item.target.fieldId])
            .map((item, index) => (
                <Filter
                    key={item.id}
                    field={fieldsWithSuggestions[item.target.fieldId]}
                    filterRule={item}
                    onRemove={() =>
                        removeDimensionDashboardFilter(index, false)
                    }
                    onUpdate={(value) =>
                        updateDimensionDashboardFilter(
                            value,
                            index,
                            false,
                            isEditMode,
                        )
                    }
                    {...{ isEditMode, isTemporary }}
                />
            ));
    };

    return (
        <>
            {getMappedFilters(dashboardFilters)}
            {getMappedFilters(dashboardTemporaryFilters, true)}
        </>
    );
};

export default ActiveFilters;
