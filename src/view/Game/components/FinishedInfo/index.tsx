import { Component } from 'solid-js'

import CheckIcon from '@suid/icons-material/CheckCircle'
import { Stack } from '@suid/material'

import GameInfoChip from '../../../../common/components/GameInfoChip'
import { IFinishedEntry } from '../../../../common/interfaces/common'

import styles from './styles.module.scss'

export interface FinishedInfoProps {
    signal?: IFinishedEntry
}

const FinishedInfo: Component<FinishedInfoProps> = (props) => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={6}>
            <CheckIcon class={styles.check} sx={{ fontSize: 80, color: 'green' }} />
            {props.signal?.info && <GameInfoChip label="Info" info={props.signal.info} />}
        </Stack>
    )
}

export default FinishedInfo
