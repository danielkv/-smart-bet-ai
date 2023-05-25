import { createEffect } from 'solid-js'

import { useNavigate } from '@solidjs/router'

import { loggedUser } from '../../domain/contexts/user'
import { ERouteNames } from '../../router/types'

export function redirectToLogin() {
    const navigate = useNavigate()

    createEffect(() => {
        if (loggedUser() === null) {
            navigate(ERouteNames.LOGIN)
        }
    })
}
