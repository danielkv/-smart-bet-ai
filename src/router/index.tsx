import { A, Route, Routes } from '@solidjs/router'
import { Games, Home } from '@suid/icons-material'
import { Box, Container, MenuItem, Stack, Toolbar } from '@suid/material'

import HomeRoute from '../view/Home'
import GameScreen from '../view/game'

const AppRouter = () => {
    return (
        <Stack flex={1}>
            <Box flex={1}>
                <Container maxWidth="sm" style={{ display: 'flex', height: '100%' }}>
                    <Routes>
                        <Route path="/" element={<HomeRoute />} />
                        <Route path="/games/:gameName" component={GameScreen} />
                    </Routes>
                </Container>
            </Box>
            <Box bgcolor="#333">
                <Toolbar>
                    <Container maxWidth="sm">
                        <Stack direction="row" justifyContent="center" spacing={3}>
                            <A href="/">
                                <MenuItem>
                                    <Home />
                                </MenuItem>
                            </A>
                            <MenuItem>
                                <Games />
                            </MenuItem>
                        </Stack>
                    </Container>
                </Toolbar>
            </Box>
        </Stack>
    )
}

export default AppRouter
