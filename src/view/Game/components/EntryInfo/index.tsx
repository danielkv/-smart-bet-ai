import { Component, Match, Switch } from 'solid-js'

import { IAviatorEntry } from '../../../../common/interfaces/aviator'
import { IBacBoEntry } from '../../../../common/interfaces/bac-bo'
import { TEntryType } from '../../../../common/interfaces/common'
import { IDragonTigerEntry } from '../../../../common/interfaces/dragon-tiger'
import { IMinesEntry } from '../../../../common/interfaces/mines'
import { IPenaltyEntry } from '../../../../common/interfaces/penalty'
import { ISpaceManEntry } from '../../../../common/interfaces/space-man'

import AviatorEntryInfo from './aviator'
import BacBoEntryInfo from './bacbo'
import DragonTigerEntryInfo from './dragon-tiger'
import MinesEntryInfo from './mines'
import PenaltyEntryInfo from './penalty'
import SpaceManEntryInfo from './space-man'

export interface EntryInfoProps {
    entry?: TEntryType
}

const EntryInfo: Component<EntryInfoProps> = (props) => {
    if (!props.entry) return

    return (
        <Switch>
            <Match when={props.entry.game === 'mines'}>
                <MinesEntryInfo entry={props.entry as IMinesEntry} />
            </Match>
            <Match when={props.entry.game === 'dragon-tiger'}>
                <DragonTigerEntryInfo entry={props.entry as IDragonTigerEntry} />
            </Match>
            <Match when={props.entry.game === 'space-man'}>
                <SpaceManEntryInfo entry={props.entry as ISpaceManEntry} />
            </Match>
            <Match when={props.entry.game === 'aviator'}>
                <AviatorEntryInfo entry={props.entry as IAviatorEntry} />
            </Match>
            <Match when={props.entry.game === 'bacbo'}>
                <BacBoEntryInfo entry={props.entry as IBacBoEntry} />
            </Match>
            <Match when={props.entry.game === 'penalty'}>
                <PenaltyEntryInfo entry={props.entry as IPenaltyEntry} />
            </Match>
        </Switch>
    )
}

export default EntryInfo
