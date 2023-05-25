import { ERouteNames } from './types'

export function pathJoin(root: ERouteNames, ...routes: string[]): string {
    return `${root}/${routes.join('/')}`
}
