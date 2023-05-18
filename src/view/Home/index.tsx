import { Component, For, createSignal, onCleanup, onMount } from 'solid-js'
import { produce } from 'solid-js/store'

import { Button, Chip, Grid, Stack, Typography } from '@suid/material'

import { messageReader } from '../../bot/readers/reader'
import GameItem from '../../common/components/GameItem'
import { TSignal } from '../../common/interfaces/common'
import { setSignalStore, signalStore } from '../../domain/contexts/signals'

import { GAMES } from './config'
import styles from './styles.module.scss'

const [possible, setPossible] = createSignal(false)
const [confirmed, setConfirmed] = createSignal(false)

const HomeRoute: Component = () => {
    function callback(signal: TSignal) {
        if (signal.type === 'possible' && !possible()) {
            setPossible(true)
        }
        if (signal.type === 'entry' && possible() && !confirmed()) {
            setConfirmed(true)
        }

        setSignalStore(
            produce((current) => {
                const game = current[signal.game]

                switch (signal.type) {
                    case 'entry': {
                        if (!game?.possible) return
                        game.entry = signal
                        break
                    }
                    case 'possible': {
                        current[signal.game] = {
                            possible: signal,
                            score: game?.score,
                        }
                        break
                    }
                    default: {
                        if (!game?.possible || !game?.entry) return

                        game[signal.type as 'finished' | 'gale' | 'score'] = signal as any

                        break
                    }
                }
            })
        )
    }

    const removeListener = messageReader.listen(callback)

    onCleanup(() => {
        removeListener()
    })

    return (
        <Stack gap={6} my={6}>
            <Stack gap={3}>
                <Typography variant="h1" fontSize="26px" textAlign="center">
                    Escolha o jogo que quer ganhar
                </Typography>

                <Stack direction="row" justifyContent="center" gap={2}>
                    <Chip
                        classList={{ [styles.chipGlow]: possible() }}
                        label="Possibilidade de entrada"
                        variant={possible() ? 'filled' : 'outlined'}
                        color="warning"
                    />
                    <Chip
                        classList={{ [styles.chipGlow]: confirmed() }}
                        variant={confirmed() ? 'filled' : 'outlined'}
                        label="Entrada confirmada"
                        color="success"
                    />
                </Stack>
            </Stack>

            <Grid container spacing={6} columns={12}>
                <For each={GAMES}>
                    {(item) => (
                        <GameItem
                            name={item.name}
                            label={item.label}
                            url={item.url}
                            image={item.image}
                            withSignal={!!signalStore?.[item.name]}
                        />
                    )}
                </For>
            </Grid>

            <Button variant="contained" class="growing">
                Alterar para Smart Bet AI Pro
            </Button>
        </Stack>
    )
}

export default HomeRoute
