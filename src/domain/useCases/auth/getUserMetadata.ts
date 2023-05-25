import { firebaseProvider } from '../../../common/providers/firebase'

interface IUserMetadata {
    creationTime: string
    lastRefreshTime: string
    lastSignInTime: string
}

const getUserMetadata = firebaseProvider.FUNCTION_CALL<string, IUserMetadata>('getUserData')

export async function getUserMetadataUseCase(email: string): Promise<IUserMetadata> {
    const { data } = await getUserMetadata(email)

    return data
}
