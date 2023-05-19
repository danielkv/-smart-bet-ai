import dayjs from 'dayjs'

import { Component } from 'solid-js'

import { Stack } from '@suid/material'

import GameInfoChip from '../../../../common/components/GameInfoChip'
import { IPenaltyEntry } from '../../../../common/interfaces/penalty'

export interface PenaltyEntryInfoProps {
    entry: IPenaltyEntry
}

const icons = {
    hand: '🧤',
    ball: '⚽️',
    person: '🧍',
}

const PenaltyEntryInfo: Component<PenaltyEntryInfoProps> = (props) => {
    console.log(JSON.stringify(props.entry.map, null, 2))

    return (
        <Stack direction="row" spacing={6} justifyContent="center" alignItems="center">
            <Stack direction="row" spacing={3}>
                <GameInfoChip label="Seleção" info={props.entry.team} />
                <GameInfoChip label="Tentativas" info={props.entry.tries} />
                <GameInfoChip label="Expira as" info={dayjs(props.entry.expiresAt).format('HH:mm')} />
            </Stack>

            <Stack spacing={2}>
                {props.entry.map
                    .replaceAll(' ', '')
                    .split('\n\n')
                    .map((play) => (
                        <Stack>
                            {play.split('\n').map((row) => (
                                <div>{row.split('\n')}</div>
                            ))}
                        </Stack>
                    ))}
            </Stack>
        </Stack>
    )
}

export default PenaltyEntryInfo
