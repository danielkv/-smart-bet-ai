import { createSignal } from 'solid-js'

import { IUser } from '../../common/models/user'

export const [loggedUser, setLoggedUser] = createSignal<IUser | null>(null)
