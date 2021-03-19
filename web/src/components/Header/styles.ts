import styled from 'styled-components'

export const HeaderContainer = styled.div`
	background-color: ${({ theme }) => theme.colors.primary};
	height: 13.25rem;
`

export const HeaderContent = styled.div`
	max-width: 70rem;
	padding-top: 2.5rem;
	margin: 0 auto;

	display: flex;
	align-items: center;
	justify-content: space-between;
`
export const ButtonTransaction = styled.button`
	padding: 0.75rem 1.75rem;

	border: 0;
	border-radius: 6px;

	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.shape};
	font-size: 1rem;
	font-weight: 700;

	&:hover {
		filter: brightness(0.9);
	}
`

// font-family: Roboto;
