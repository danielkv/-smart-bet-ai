import dayjs from 'dayjs'

import { Component, For } from 'solid-js'

import { Stack } from '@suid/material'

import GameInfoChip from '../../../../common/components/GameInfoChip'
import { IMinesEntry } from '../../../../common/interfaces/mines'

export interface MinesEntryInfoProps {
    entry: IMinesEntry
}

const icons = {
    none: '🟦',
    star: '⭐',
}

const MinesEntryInfo: Component<MinesEntryInfoProps> = (props) => {
    return (
        <Stack direction="row" spacing={3}>
            <GameInfoChip label="Minas" info={props.entry.mines} />
            <GameInfoChip label="Expira as" info={dayjs(props.entry.expiresAt).format('HH:mm')} />

            <Stack direction="column">
                <For each={props.entry.map}>
                    {(row) => (
                        <Stack direction="row">
                            <For each={row}>{(item) => <div>{icons[item]}</div>}</For>
                        </Stack>
                    )}
                </For>
            </Stack>
        </Stack>
    )
}

export default MinesEntryInfo
