import { DashboardFilters } from '@lightdash/common';
import { FC } from 'react';
import { useDashboardContext } from '../../../providers/DashboardProvider';
import Filter from '../Filter';
import SkeletonGroup from './Skeletons';

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
        return <SkeletonGroup length={5} />;
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
