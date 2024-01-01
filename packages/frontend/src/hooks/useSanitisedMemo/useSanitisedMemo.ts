/* eslint-disable react-hooks/exhaustive-deps */
/* Disabled so TS can check the deps against the callback args. */

import { useMemo } from 'react';

/**
 * Custom hook for creating a memoized callback with sanitisation.
 * If any arguments are undefined, returns undefined. Otherwise the callback
 * is called with the arguments and the result is returned and memoised.
 * Used for functional callbacks without additional dependencies.
 *
 * @example
 * // Example usage.
 * const memoisedResult = useSanitisedMemo(callbackWithTwoArgs, [
 *   callbackArg1!,
 *   callbackArg2!,
 * ]);
 *
 * @template T - The type of the callback function.
 * @param {T} callback - The callback function to memoize.
 * @param {Partial<Parameters<T>>} args - The arguments to pass to the callback. Will also be used for memo dependencies.
 * @returns {ReturnType<T> | undefined} - The result of the memoized callback or undefined.
 */
const useSanitisedMemo = <T extends (...args: any[]) => any>(
    callback: T,
    args: Parameters<T>,
): ReturnType<T> | undefined => {
    return useMemo<ReturnType<T>>(() => {
        if (!args.every((arg: any) => arg !== undefined)) return;
        return callback(...(args as Parameters<T>));
    }, [...(args as Parameters<T>), callback]);
};

export default useSanitisedMemo;
