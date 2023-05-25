import { browserLocalPersistence } from 'firebase/auth'

import { firebaseProvider } from '../../../common/providers/firebase'

export async function intialLoad() {
    firebaseProvider.getAuth().setPersistence(browserLocalPersistence)
}
