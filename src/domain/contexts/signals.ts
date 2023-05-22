import clonedeep from 'clone-deep'

import { createStore } from 'solid-js/store'

import { TSignal, TSignalStore } from '../../common/interfaces/common'

export const [signalStore, setSignalStore] = createStore<Partial<TSignalStore>>()

export function getGameStore<Name extends keyof TSignalStore>(game: Name): TSignalStore[Name] | undefined {
    const gameSignals = signalStore[game]
    return gameSignals
}

export function updateSignalStore(signals: TSignal[]) {
    const store: Partial<TSignalStore> = clonedeep(signalStore)

    signals.forEach((signal) => {
        const game = store[signal.game]

        switch (signal.type) {
            case 'entry': {
                store[signal.game] = {
                    ...store[signal.game],
                    entry: signal as any,
                }
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
                if (!game) return
            case 'score': {
                store[signal.game] = { [signal.type]: signal, entry: game?.entry as any }
                break
            }
            default: {
                if (!game?.entry) return

                game[signal.type] = signal

                break
            }
        }
    })

    setSignalStore(() => store)
}
