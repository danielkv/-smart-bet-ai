import type { Component } from 'solid-js'

import { Router } from '@solidjs/router'
import { Stack } from '@suid/material'

import AppRouter from './router'

const App: Component = () => {
    return (
        <Stack height="100%">
            <Router>
                <AppRouter />
            </Router>
        </Stack>
    )
}

export default App
