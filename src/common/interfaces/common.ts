import { IAviatorEntry } from './aviator'
import { IBacBoEntry } from './bac-bo'
import { IDragonTigerEntry } from './dragon-tiger'
import { IMinesEntry } from './mines'
import { IPenaltyEntry } from './penalty'
import { ISpaceManEntry } from './space-man'

export type TSignal =
    | IPossibleEntry
    | IMinesEntry
    | IFinishedEntry
    | IBacBoEntry
    | ISpaceManEntry
    | IDragonTigerEntry
    | IGale
    | IScore
    | IAviatorEntry
    | IPenaltyEntry

export type TGameType = 'aviator' | 'bacbo' | 'dragon-tiger' | 'penalty' | 'space-man' | 'mines'

export type TSignalType = 'possible' | 'finished' | 'gale' | 'score' | 'entry'

export interface IPossibleEntry {
    game: TGameType
    type: 'possible'
    entry: string
    odds?: string
    createdAt: number
}

export interface IFinishedEntry {
    game: TGameType
    type: 'finished'
    result: 'green' | 'red'
    time?: string
    info?: string
    createdAt: number
}

export interface IGale {
    game: TGameType
    type: 'gale'
    round: number
    createdAt: number
}

export interface IScore {
    game: TGameType
    type: 'score'
    greens: number
    reds: number
    pct: number
    consecutiveGreens: number
    createdAt: number
}
