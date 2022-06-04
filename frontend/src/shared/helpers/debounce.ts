export const debounce = <T extends (...args: any) => any>(func: T, wait: number): (...args: Parameters<T>[]) => void => {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}