import { ButtonTransaction, HeaderContainer, HeaderContent } from './styles'

import logoSvg from '../../assets/logo.svg'

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoSvg} alt="logo dtmoney" />
				<ButtonTransaction>Nova transação</ButtonTransaction>
			</HeaderContent>
		</HeaderContainer>
	)
}
