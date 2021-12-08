import styled from 'styled-components'


export const Container = styled.div`
	border: 1px solid;
	margin-top: 10vh;
	margin-bottom: 17vh;
	border-radius: 10px;
	box-shadow: 3px 3px 7px;
	h3{
		text-align: center;
	}
	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10px;
		gap: 10px;
		input[type=date]{
			width: 57vw;
		}
	}

`