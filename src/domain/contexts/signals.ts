import { createStore } from 'solid-js/store'

import { IAviatorEntry } from '../../common/interfaces/aviator'
import { IBacBoEntry } from '../../common/interfaces/bac-bo'
import { IFinishedEntry, IGale, IPossibleEntry, IScore } from '../../common/interfaces/common'
import { IDragonTigerEntry } from '../../common/interfaces/dragon-tiger'
import { IMinesEntry } from '../../common/interfaces/mines'
import { IPenaltyEntry } from '../../common/interfaces/penalty'
import { ISpaceManEntry } from '../../common/interfaces/space-man'

type TStoredSignal<E> = Partial<{
    possible: IPossibleEntry
    finished: IFinishedEntry
    gale: IGale
    score: IScore
    entry: E
}>

type TSignalStore = {
    aviator: TStoredSignal<IAviatorEntry>
    bacbo: TStoredSignal<IBacBoEntry>
    'dragon-tiger': TStoredSignal<IDragonTigerEntry>
    penalty: TStoredSignal<IPenaltyEntry>
    'space-man': TStoredSignal<ISpaceManEntry>
    mines: TStoredSignal<IMinesEntry>
}

export const [signalStore, setSignalStore] = createStore<Partial<TSignalStore>>()
