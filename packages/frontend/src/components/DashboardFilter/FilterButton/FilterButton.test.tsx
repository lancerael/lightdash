/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import FilterButton from './FilterButton';

const props = {
    onClick: () => {},
};

describe('Input', () => {
    it('should render a Button', () => {
        render(<FilterButton {...props}>Title</FilterButton>);
        expect(screen.getAllByText('Title')).toHaveLength(1);
    });

    it('should not fail any accessibility tests', async () => {
        const { container } = render(
            <FilterButton {...props}>Title</FilterButton>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
