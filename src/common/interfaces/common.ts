import { IAviatorEntry } from './aviator'
import { IBacBoEntry } from './bac-bo'
import { IDragonTigerEntry } from './dragon-tiger'
import { IMinesEntry } from './mines'
import { IPenaltyEntry } from './penalty'
import { ISpaceManEntry } from './space-man'

export type TEntryType = IMinesEntry | IBacBoEntry | ISpaceManEntry | IDragonTigerEntry | IAviatorEntry | IPenaltyEntry

export type TSignal = IPossibleEntry | IFinishedEntry | IGale | IScore | TEntryType

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

export interface TGameSignals<Entry> {
    possible?: IPossibleEntry
    finished?: IFinishedEntry
    gale?: IGale
    score?: IScore
    entry?: Entry
}

export interface IGameConfig {
    image: string
    name: TGameType
    label: string
    url: string
}

export type TSignalStore = {
    aviator: TGameSignals<IAviatorEntry>
    bacbo: TGameSignals<IBacBoEntry>
    'dragon-tiger': TGameSignals<IDragonTigerEntry>
    penalty: TGameSignals<IPenaltyEntry>
    'space-man': TGameSignals<ISpaceManEntry>
    mines: TGameSignals<IMinesEntry>
}
