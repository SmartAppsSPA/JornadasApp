import {createContext} from 'react'

const PreferencesContext = createContext(
    {
       userData: '',
       UpdateUserData: () => {}, 
    }
)

export default PreferencesContext