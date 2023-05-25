import { FirebaseApp, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'

type TFirebaseProviderOptions = {
    authEmulatorUrl?: string
    functionEmulator?: {
        host: string
        port: number
    }
}

class FirebaseProvider {
    private app: FirebaseApp | null = null

    constructor(readonly options?: TFirebaseProviderOptions) {}

    getApp() {
        if (this.app) return this.app

        try {
            this.app = initializeApp({
                apiKey: import.meta.env.VITE_APP_APIKEY,
                authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
                projectId: import.meta.env.VITE_APP_PROJECTID,
                storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
                messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
                appId: import.meta.env.VITE_APP_APPID,
                measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
            })

            if (this.options?.authEmulatorUrl) {
                const auth = getAuth(this.app)
                connectAuthEmulator(auth, this.options.authEmulatorUrl)
            }

            if (this.options?.functionEmulator) {
                const functions = getFunctions(this.app)
                connectFunctionsEmulator(
                    functions,
                    this.options.functionEmulator.host,
                    this.options.functionEmulator.port
                )
            }

            return this.app
        } catch (err) {
            console.error('Ocorreu um erro ao inicialiar a conexão com o Banco de dados')
        }
    }

    getAuth() {
        const app = this.getApp()
        if (!app) throw new Error('Provedor de requisições não conectado')

        return getAuth(app)
    }

    getFunctions() {
        const app = this.getApp()
        if (!app) throw new Error('Provedor de requisições não conectado')

        return getFunctions(app)
    }

    FUNCTION_CALL<RequestData = unknown, ResponseData = unknown>(fnName: string) {
        const functions = this.getFunctions()
        if (!functions) throw new Error('Provedor de requisições não conectado')

        return httpsCallable<RequestData, ResponseData>(functions, fnName)
    }
    //
}

export const firebaseProvider = new FirebaseProvider({
    authEmulatorUrl: 'http://localhost:9099',
    functionEmulator: {
        host: 'localhost',
        port: 5001,
    },
})
