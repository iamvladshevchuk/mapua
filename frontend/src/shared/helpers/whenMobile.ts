import isMobile from "./isMobile";

export default function whenMobile<T extends (...args: any) => any>(fn: T): ReturnType<T> | undefined {
    if (!isMobile())
        return

    return fn()
}