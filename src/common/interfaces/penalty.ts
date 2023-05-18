export interface IPenaltyEntry {
    game: 'penalty'
    type: 'entry'
    team: string
    tries: number
    expiresAt: number
    map: ('hand' | 'ball' | 'person')[][][]
    createdAt: number
}
