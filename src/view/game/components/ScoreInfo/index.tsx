import { Component } from 'solid-js'

import CircleIcon from '@suid/icons-material/Circle'
import { Stack } from '@suid/material'

import GameInfoChip from '../../../../common/components/GameInfoChip'
import { IScore } from '../../../../common/interfaces/common'

export interface ScoreInfoProps {
    signal?: IScore
}

const ScoreInfo: Component<ScoreInfoProps> = (props) => {
    if (!props.signal) return

    return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={6}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <CircleIcon sx={{ fontSize: 30, color: 'green' }} />
                <GameInfoChip label="Total de greens" info={props.signal.greens} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
                <CircleIcon sx={{ fontSize: 30, color: 'red' }} />
                <GameInfoChip label="Total de reds" info={props.signal.reds} />
            </Stack>
            <GameInfoChip label="Vitórias" info={`${props.signal.pct}%`} />
        </Stack>
    )
}

export default ScoreInfo
