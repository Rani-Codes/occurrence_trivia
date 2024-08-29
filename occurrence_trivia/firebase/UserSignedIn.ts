import { getAuth } from 'firebase/auth'

export const userSignedIn = (): boolean => {
    const auth = getAuth()
    return !!auth.currentUser //Converts the result into an actual 'true' or 'false' type not using !!
}