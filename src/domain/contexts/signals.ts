import clonedeep from 'clone-deep'

import { createStore } from 'solid-js/store'

import { IAviatorEntry } from '../../common/interfaces/aviator'
import { IBacBoEntry } from '../../common/interfaces/bac-bo'
import { IFinishedEntry, IGale, IPossibleEntry, IScore, TSignal } from '../../common/interfaces/common'
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

export function updateSignalStore(signals: TSignal[]) {
    const store: Partial<TSignalStore> = clonedeep(signalStore)

    signals.forEach((signal) => {
        const game = store[signal.game]

        switch (signal.type) {
            case 'entry': {
                if (!game?.possible) return
                game.entry = signal
                break
            }
            case 'possible': {
                store[signal.game] = {
                    possible: signal,
                    score: game?.score,
                }
                break
            }
            case 'finished':
            case 'score': {
                if (!game) return

                store[signal.game] = { [signal.type]: signal, entry: game?.entry as any }
                break
            }
            default: {
                if (!game?.possible || !game?.entry) return

                game[signal.type] = signal

                break
            }
        }
    })

    setSignalStore(() => store)
}
