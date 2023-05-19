export interface IPenaltyEntry {
    game: 'penalty'
    type: 'entry'
    team: string
    tries: number
    expiresAt: number
    map: string
    createdAt: number
}
