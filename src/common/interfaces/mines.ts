export interface IMinesEntry {
    game: 'mines'
    type: 'entry'
    mines: number
    tries: number
    expiresAt: number
    map: ('star' | 'none')[][]
    createdAt: number
}
