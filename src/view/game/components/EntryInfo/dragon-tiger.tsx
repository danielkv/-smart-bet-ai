import { invert } from 'radash'

import { Component } from 'solid-js'

import { Box, Stack } from '@suid/material'

import { CIRCLE_COLORS } from '../../../../bot/utils/common'
import GameInfoChip from '../../../../common/components/GameInfoChip'
import { IDragonTigerEntry } from '../../../../common/interfaces/dragon-tiger'

export interface DragonTigerEntryInfoProps {
    entry: IDragonTigerEntry
}

const colors = invert(CIRCLE_COLORS)

const DragonTigerEntryInfo: Component<DragonTigerEntryInfoProps> = (props) => {
    return (
        <Stack direction="row" spacing={3}>
            <GameInfoChip label="Entre na cor" info={String.fromCodePoint(Number(colors[props.entry.entry]))} />
            <GameInfoChip label="Proteção" info={String.fromCodePoint(Number(colors[props.entry.protection]))} />
            <GameInfoChip label="Estratégia" info={props.entry.strategy} />
        </Stack>
    )
}

export default DragonTigerEntryInfo
