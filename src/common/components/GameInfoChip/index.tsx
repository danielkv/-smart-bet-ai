import { Component } from 'solid-js'

import { Chip, Stack, Typography } from '@suid/material'

import styles from './styles.module.scss'

export interface GameInfoChipProps {
    label: string
    info: string | number
}

const GameInfoChip: Component<GameInfoChipProps> = (props) => {
    return (
        <Stack>
            <Typography textAlign="center">{props.label}</Typography>
            <Chip size="small" variant="filled" class={styles.chip} label={props.info} />
        </Stack>
    )
}

export default GameInfoChip
