import { Component } from 'solid-js'

import { Box, Grid, Stack, Typography } from '@suid/material'

import { IGame } from '../../../view/Home/config'

import styles from './styles.module.scss'

export interface GameItemProps extends IGame {
    signal?: 'possible' | 'entry'
}

const GameItem: Component<GameItemProps> = (props) => {
    return (
        <Grid item xs={4}>
            <a class={styles.gameButton} href={props.url}>
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
            </a>
        </Grid>
    )
}

export default GameItem
