import {
	ArrowCircleDown,
	ArrowCircleUp,
	CurrencyDollar,
} from '@phosphor-icons/react'
import { SummaryContainer } from './styles'

export function Summary() {
	return (
		<SummaryContainer>
			<div>
				<header>
					<span>Entradas</span>
					<ArrowCircleUp size={32} />
				</header>
				<strong>R$ 17.400,00</strong>
			</div>

			<div>
				<header>
					<span>Entradas</span>
					<ArrowCircleDown size={32} />
				</header>
				<strong>R$ 1.259,00</strong>
			</div>

			<div>
				<header>
					<span>Entradas</span>
					<CurrencyDollar size={32} />
				</header>
				<strong>R$ 16.141,00</strong>
			</div>
		</SummaryContainer>
	)
}
