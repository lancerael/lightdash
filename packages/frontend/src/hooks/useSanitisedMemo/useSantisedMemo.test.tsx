import { renderHook } from '@testing-library/react-hooks';
import useSanitisedMemo from './useSanitisedMemo';

describe('useSanitisedMemo', () => {
    it('should return undefined when any argument is undefined', () => {
        // Arrange
        const callback = jest.fn();
        const falsyArgs = ['value', 0, undefined];

        // Act
        const { result } = renderHook(() =>
            useSanitisedMemo(callback, falsyArgs),
        );

        // Assert
        expect(result.current).toBeUndefined();
        expect(callback).not.toHaveBeenCalled();
    });

    it('should call the callback with sanitised arguments', () => {
        // Arrange
        const callback = jest.fn();
        const validArgs = ['value', 0, true];

        // Act
        const { result } = renderHook(() => {
            useSanitisedMemo(callback, validArgs);
        });

        // Assert
        expect(result.current).toBeUndefined();
        expect(callback).toHaveBeenCalledWith(...validArgs);
    });

    it.only('should return the memoized result when arguments are valid', () => {
        // Arrange
        const callback = jest.fn((a, b) => a + b);
        const validArgs: [number, number] = [3, 7];

        // Act
        const { result, rerender } = renderHook(() =>
            useSanitisedMemo(callback, validArgs),
        );

        // Assert
        expect(result.current).toBe(10);
        expect(callback).toHaveBeenCalledWith(3, 7);

        // Re-render with the same arguments to test memoization
        rerender();
        expect(result.current).toBe(10);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
