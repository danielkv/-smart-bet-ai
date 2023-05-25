import { Component } from 'solid-js'

import { Box, Stack } from '@suid/material'

import GameInfoChip from '../../../../common/components/GameInfoChip'
import { ISpaceManEntry } from '../../../../common/interfaces/space-man'

export interface SpaceManEntryInfoProps {
    entry: ISpaceManEntry
}

const SpaceManEntryInfo: Component<SpaceManEntryInfoProps> = (props) => {
    return (
        <Stack direction="row" spacing={3}>
            <GameInfoChip label="Entrar após" info={props.entry.entry} />
            <GameInfoChip label="Saia em" info={props.entry.exit} />
        </Stack>
    )
}

export default SpaceManEntryInfo
