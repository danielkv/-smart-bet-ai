import { getAuth } from 'firebase-admin/auth'
import * as functions from 'firebase-functions'

import { init } from './helpers'
import { ESaleStatus, IPerfectPayPayload } from './interfaces/webhook'

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

init()

export const createUserWebhook = functions.https.onRequest(async (request, response) => {
    const payload = request.body as IPerfectPayPayload

    if (payload.sale_status_enum !== ESaleStatus.APPROVED) {
        functions.logger.info('Sale is not approved', { structuredData: true })
        response.sendStatus(200)
        return
    }

    const { customer } = payload

    const password = customer.identification_number.substring(0, 6)

    await getAuth().createUser({ displayName: customer.full_name, email: customer.email, password })

    response.sendStatus(200)
})

export const getUserData = functions.https.onCall(async (email: string) => {
    const auth = getAuth()

    const user = await auth.getUserByEmail(email)

    return user.metadata
})
