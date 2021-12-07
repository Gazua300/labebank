import styled from 'styled-components'
import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import BackIcon from '../../img/back1.jpeg'
import { url } from '../../constants/urls'
import axios from 'axios'


const Container = styled.div`
	border: 1px solid;
	margin-top: 10vh;
	margin-bottom: 45vh;
	border-radius: 10px;
	box-shadow: 3px 3px 7px;
	h3{
		text-align: center;
	}
	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin: 10px;
		input[type=date]{
			width: 57vw;
		}
	}

	div{
		margin: 10px;
	}

`
const Header = styled.header`
	img{
		cursor: pointer;
		border-radius: 10px;
	}
`


const Login = ()=>{
	const history = useHistory()
	const [form, setForm] = useState({
		cpf:'',
		password:''
	})



	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}



	const register = (e)=>{
		e.preventDefault()

		const body = {
			cpf: form.cpf,
			password: form.password
		}
		axios.post(`${url}/accounts/login`, body).then(res=>{
			console.log(res.data)
		}).catch(err=>{
			alert(err.response.data)
		})

	}

//=========================Render=======================================
	return<div>
			  <Header>
				<img src={BackIcon} onClick={()=> history.push('/')} alt=''/>
			  </Header>
			  <Container>
				<form onSubmit={register} >
				<h3>Acesse sua conta</h3>
				<input type='number' name='cpf' value={form.cpf} onChange={onChange}
				 placeholder='CPF(somente números)' required autoFocus/>
				<input type='password' name='password' value={form.password} onChange={onChange}
				 placeholder='Senha' required />
				<button>Acessar</button>
				</form>
				<div>Clique <Link to='/signup'>aqui</Link> para abrir sua conta.</div>
			  </Container>
		  </div>
}
export default Login
