import { connection } from '../connection/connection'
import { Request, Response } from 'express'
import { Authenticate } from '../services/Authenticate'


export const createClient = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400

	try{

		const {name, cpf, email, initialDate, password, passwordConf} = req.body
		const [day, month, year] = initialDate.split('/')
		const birthDate = new Date(`${year}-${month}-${day}`)
		const millisecondsAge = Date.now() - birthDate.getTime()
		const age = millisecondsAge / 1000 / 60 / 60 /24 / 365


    if(!name || !cpf ||!email || !initialDate || !password || !passwordConf){
      statusCode = 401
      throw new Error('Preencha os campos!')
    }

		if(age < 18){
			statusCode = 401
			throw new Error('Necessário ser maior de idade!')

		}

    const [user] = await connection('labebank').where({
      cpf
    })

    if(user){
      statusCode = 401
      throw new Error('Conta já existe em nossos registros')
    }

    const [clientEmail] = await connection('labebank').where({
      email
    })

    if(clientEmail){
      statusCode = 401
      throw new Error('Conta já existe em nossos registros')
    }

    if(password !== passwordConf){
      statusCode = 401
      throw new Error('As senhas não correspondem!')
    }

    const hash = new Authenticate().hash(password)
    const token = new Authenticate().token(cpf)

		await connection('labebank').insert({
			name,
			cpf,
      email,
			birth_date: birthDate,
			balance: 0,
      password: hash
		})


    res.status(200).send(token)
	}catch(error: any){
		res.status(statusCode).send({message: error.message || error.sqlMessage})
	}
}