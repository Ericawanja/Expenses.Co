import {Router} from 'express'
import { register } from '../Controllers'

 const auth = Router()

auth.post('/register', register)

export default auth