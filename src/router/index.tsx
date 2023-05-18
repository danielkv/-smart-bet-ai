import { Route, Routes } from '@solidjs/router'
import { Games, Home } from '@suid/icons-material'
import { Box, Container, MenuItem, Stack, Toolbar } from '@suid/material'

import HomeRoute from '../view/Home'

const AppRouter = () => {
    return (
        <Stack flex={1}>
            <Box flex={1}>
                <Container maxWidth="sm">
                    <Routes>
                        <Route path="/" element={<HomeRoute />} />
                    </Routes>
                </Container>
            </Box>
            <Box bgcolor="#333">
                <Toolbar>
                    <Container maxWidth="sm">
                        <Stack direction="row" justifyContent="center" spacing={3}>
                            <MenuItem>
                                <Home />
                            </MenuItem>
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
