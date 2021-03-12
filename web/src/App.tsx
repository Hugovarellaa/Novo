import { ThemeProvider } from 'styled-components'
import { lightTheme } from './theme/light-mode'

export function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<div>
				<h1>First render</h1>
			</div>
		</ThemeProvider>
	)
}
