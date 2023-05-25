import { Component } from 'solid-js'

import { A } from '@solidjs/router'
import { Games, Home } from '@suid/icons-material'
import { Box, Container, MenuItem, Stack, Toolbar } from '@suid/material'

import { ERouteNames } from '../../../router/types'

const BottomBar: Component = () => {
    return (
        <Box bgcolor="#333">
            <Toolbar>
                <Container maxWidth="sm">
                    <Stack direction="row" justifyContent="center" spacing={3}>
                        <MenuItem component={A} href={ERouteNames.GAMES}>
                            <Home />
                        </MenuItem>

                        <MenuItem component={A} href={ERouteNames.LOGIN}>
                            <Games />
                        </MenuItem>
                    </Stack>
                </Container>
            </Toolbar>
        </Box>
    )
}

export default BottomBar
