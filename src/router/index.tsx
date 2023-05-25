import { User } from 'firebase/auth'

import { onCleanup } from 'solid-js'

import { A, Route, Routes, useLocation, useNavigate } from '@solidjs/router'
import { Games, Home } from '@suid/icons-material'
import { Box, Container, MenuItem, Stack, Toolbar } from '@suid/material'

import BottomBar from '../common/components/BottomBar/indes'
import { firebaseProvider } from '../common/providers/firebase'
import { setLoggedUser } from '../domain/contexts/user'
import GameScreen from '../view/Game'
import GamesScreen from '../view/Games'
import LoginScreen from '../view/Login'

import { ERouteNames } from './types'
import { pathJoin } from './utils'

const AppRouter = () => {
    const location = useLocation()
    const navigate = useNavigate()

    function handleAuthStateChanged(user: User | null) {
        if (!user || !user?.displayName || !user?.email) return setLoggedUser(null)

        setLoggedUser({
            name: user.displayName,
            email: user.email,
        })

        if (location.pathname === '/login') navigate(ERouteNames.GAMES)
    }

    const unsubscribe = firebaseProvider.getAuth().onAuthStateChanged(handleAuthStateChanged)

    onCleanup(() => {
        unsubscribe()
    })

    return (
        <Stack flex={1}>
            <Box flex={1}>
                <Container maxWidth="sm" style={{ display: 'flex', height: '100%' }}>
                    <Routes>
                        <Route path="/" component={LoginScreen} />
                        <Route path={ERouteNames.LOGIN} component={LoginScreen} />

                        <Route path={ERouteNames.GAMES} component={GamesScreen} />
                        <Route path={pathJoin(ERouteNames.GAMES, ':gameName')} component={GameScreen} />
                    </Routes>
                </Container>
            </Box>
            <BottomBar />
        </Stack>
    )
}

export default AppRouter
