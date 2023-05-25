import dayjs from 'dayjs'
import { ProviderId } from 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'

import { Component, createEffect, createSignal } from 'solid-js'

import { useNavigate } from '@solidjs/router'
import { Button, Dialog, DialogActions, DialogContent, Stack } from '@suid/material'

import { firebaseProvider } from '../../common/providers/firebase'
import { getUserMetadataUseCase } from '../../domain/useCases/auth/getUserMetadata'
import { ERouteNames } from '../../router/types'

const LoginScreen: Component = () => {
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = createSignal(false)

    createEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseProvider.getAuth())

        ui.start('#loginForm', {
            signInOptions: [
                {
                    provider: ProviderId.PASSWORD,
                    fullLabel: 'Login',
                    disableSignUp: { status: true },
                },
            ],

            callbacks: {
                signInSuccessWithAuthResult: (result) => {
                    getUserMetadataUseCase(result.user.email).then((metadata) => {
                        const isNew = dayjs(metadata.creationTime).isBetween(dayjs(), dayjs().subtract(5, 'minutes'))
                        if (isNew) {
                            setOpenDialog(true)
                        } else {
                            navigate(ERouteNames.GAMES)
                        }
                    })

                    return false
                },
            },
        })
    })

    return (
        <Stack flex={1} justifyContent="center">
            <div id="loginForm" lang="pt-br"></div>
            <Dialog open={openDialog()} onClose={() => setOpenDialog(false)}>
                <DialogContent>
                    Para alterar sua senha, utilize o botão 'Problemas com login?' durante o acesso.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate(ERouteNames.GAMES)}>Continuar</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}

export default LoginScreen
