import styled from 'styled-components'

export const SummaryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	margin: 0 auto;
	margin-top: -3.5rem;

	div {
		background-color: ${({ theme }) => theme.colors.shape};
		border-radius: 6px;
		padding: 1.5rem 2rem;

		header {
			height: 2rem;

			display: flex;
			align-items: center;
			justify-content: space-between;

			span {
				font-size: 1rem;
				font-weight: 400;
				color: ${({ theme }) => theme.colors.title};
			}

			svg {
				color: red;
			}
		}

		strong {
			display: block;
			margin-top: 0.75rem;
			font-size: 2rem;
			font-weight: 700;
			color: ${({ theme }) => theme.colors.text_dark};
		}
	}
`
