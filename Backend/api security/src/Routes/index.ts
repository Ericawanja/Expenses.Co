import {Router} from 'express'
import { register } from '../Controllers'
import { validator } from '../midlewares/validator'
import { registerSchema } from '../schemas'

 const auth = Router()

auth.post('/register', validator(registerSchema),register)

export default auth