import { Component, Show, createEffect, createMemo } from 'solid-js'

import { useParams } from '@solidjs/router'
import { Alert, Box, Button, Chip, Stack, Typography } from '@suid/material'

import GameInfoChip from '../../common/components/GameInfoChip'
import { GAMES_CONFIG_OBJ } from '../../common/components/utils/game.config'
import { TGameType } from '../../common/interfaces/common'
import { getGameStore, signalStore } from '../../domain/contexts/signals'

import EntryInfo from './components/EntryInfo'
import FinishedInfo from './components/FinishedInfo'
import ScoreInfo from './components/ScoreInfo'
import styles from './styles.module.scss'

const GameScreen: Component = () => {
    const params = useParams<{ gameName: TGameType }>()

    const gameSignals = createMemo(() => getGameStore(params.gameName))
    const gameConfig = GAMES_CONFIG_OBJ[params.gameName]

    if (!gameConfig)
        return (
            <Box flex={1}>
                <Alert severity="error">O jogo não foi encontrado</Alert>
            </Box>
        )

    const signalType = createMemo(() => {
        if (gameSignals()?.entry) return 'entry'
        if (gameSignals()?.possible) return 'possible'

        return undefined
    })

    return (
        <Stack direction="column" flex={1} justifyContent="center" spacing={5}>
            <Stack direction="row" spacing={3} alignItems="center">
                <img
                    class={styles.gameImage}
                    classList={{
                        [styles.possible]: signalType() === 'possible',
                        [styles.entry]: signalType() === 'entry',
                    }}
                    src={gameConfig.image}
                />
                <Stack spacing={1}>
                    <Typography fontSize="28px" variant="h1">
                        {gameConfig.label}
                    </Typography>
                    <Chip
                        class={styles.chipPossible}
                        classList={{ [styles.chipGlowing]: signalType() === 'possible' }}
                        size="small"
                        variant="outlined"
                        color="warning"
                        label="Possível entrada"
                    />
                    <Chip
                        class={styles.chipConfirmed}
                        classList={{ [styles.chipGlowing]: signalType() === 'entry' }}
                        size="small"
                        variant="outlined"
                        color="success"
                        label="Entrada confimada"
                    />
                </Stack>
            </Stack>

            <Show when={!!gameSignals()?.entry}>
                <EntryInfo entry={gameSignals()?.entry} />
            </Show>

            <Show when={!!gameSignals()?.finished}>
                <FinishedInfo signal={gameSignals()?.finished} />
            </Show>

            <Show when={!!gameSignals()?.score}>
                <ScoreInfo signal={gameSignals()?.score} />
            </Show>

            <Button variant="outlined" href={gameConfig.url} component="a" target="_blank">
                Acessar jogo
            </Button>
        </Stack>
    )
}

export default GameScreen
