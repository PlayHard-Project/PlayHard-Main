import {useContext} from 'react'
import { UserContext } from '../UserContext/UserContext'

export default function Test() {
    const {user} = useContext(UserContext)
  return (
    <div className='container'>
        <h1>Greeting</h1>
        {!!user && (<h1>Hi{user.name}</h1>)}
    </div>
  )
}
