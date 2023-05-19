import { Component, For, createMemo, onCleanup } from 'solid-js'

import { Button, Chip, Grid, Stack, Typography } from '@suid/material'

import { messageReader } from '../../bot/readers/reader'
import GameItem from '../../common/components/GameItem'
import { signalStore, updateSignalStore } from '../../domain/contexts/signals'

import { GAMES } from './config'
import styles from './styles.module.scss'

const HomeRoute: Component = () => {
    const removeListener = messageReader.listen(updateSignalStore)

    onCleanup(() => {
        removeListener()
    })

    const thereIsPossible = createMemo(() => {
        return Object.values(signalStore).some((item) => !!item.possible)
    })
    const thereIsConfirmed = createMemo(() => {
        return Object.values(signalStore).some((item) => !!item.entry)
    })

    return (
        <Stack gap={6} my={6}>
            <Stack gap={3}>
                <Typography variant="h1" fontSize="26px" textAlign="center">
                    Escolha o jogo que quer ganhar
                </Typography>

                <Stack direction="row" justifyContent="center" gap={2}>
                    <Chip
                        classList={{ [styles.chipGlow]: thereIsPossible() }}
                        label="Possível de entrada"
                        variant={thereIsPossible() ? 'filled' : 'outlined'}
                        color="warning"
                    />
                    <Chip
                        classList={{ [styles.chipGlow]: thereIsConfirmed() }}
                        variant={thereIsConfirmed() ? 'filled' : 'outlined'}
                        label="Entrada confirmada"
                        color="success"
                    />
                </Stack>
            </Stack>

            <Grid container spacing={{ xs: 4, sm: 5 }} columns={12}>
                <For each={GAMES}>
                    {(item) => {
                        const signal = createMemo(() => {
                            if (signalStore?.[item.name]?.entry) return 'entry'
                            if (signalStore?.[item.name]?.possible) return 'possible'

                            return undefined
                        })
                        return (
                            <GameItem
                                name={item.name}
                                label={item.label}
                                url={item.url}
                                image={item.image}
                                signal={signal()}
                            />
                        )
                    }}
                </For>
            </Grid>

            <Button variant="contained" class="growing">
                Alterar para Smart Bet AI Pro
            </Button>
        </Stack>
    )
}

export default HomeRoute
