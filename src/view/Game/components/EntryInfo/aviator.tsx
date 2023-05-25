import { Component } from 'solid-js'

import { Stack } from '@suid/material'

import GameInfoChip from '../../../../common/components/GameInfoChip'
import { IAviatorEntry } from '../../../../common/interfaces/aviator'

export interface AviatorEntryInfoProps {
    entry: IAviatorEntry
}

const AviatorEntryInfo: Component<AviatorEntryInfoProps> = (props) => {
    return (
        <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
            <GameInfoChip label="Entrar após" info={props.entry.entry} />
            <GameInfoChip label="Saia em" info={props.entry.exit} />
        </Stack>
    )
}

export default AviatorEntryInfo
