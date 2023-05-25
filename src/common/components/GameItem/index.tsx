import { Component } from 'solid-js'

import { A } from '@solidjs/router'
import { Box, Grid, Stack, Typography } from '@suid/material'

import { ERouteNames } from '../../../router/types'
import { pathJoin } from '../../../router/utils'
import { IGameConfig } from '../../interfaces/common'

import styles from './styles.module.scss'

export interface GameItemProps extends Omit<IGameConfig, 'url'> {
    signal?: 'possible' | 'entry'
}

const GameItem: Component<GameItemProps> = (props) => {
    return (
        <Grid item xs={4}>
            <A class={styles.gameButton} href={pathJoin(ERouteNames.GAMES, props.name)}>
                <Stack
                    class={styles.gameItem}
                    classList={{
                        [styles.entry]: props.signal === 'entry',
                        [styles.possible]: props.signal === 'possible',
                    }}
                    style={{ 'background-image': `url(${props.image})` }}
                    direction="column"
                    alignItems="center"
                >
                    <Box class={styles.gameTitleBlock}>
                        <Typography class={styles.gameTitle} textAlign="center">
                            {props.label}
                        </Typography>
                    </Box>
                </Stack>
            </A>
        </Grid>
    )
}

export default GameItem
