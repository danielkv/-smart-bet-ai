import { Component, onCleanup } from 'solid-js'

import { Router } from '@solidjs/router'
import { Stack } from '@suid/material'

import { messageReader } from './bot/readers/reader'
import { updateSignalStore } from './domain/contexts/signals'
import AppRouter from './router'

const App: Component = () => {
    const removeListener = messageReader.listen(updateSignalStore)

    onCleanup(() => {
        removeListener()
    })

    return (
        <Stack height="100%">
            <Router>
                <AppRouter />
            </Router>
        </Stack>
    )
}

export default App
