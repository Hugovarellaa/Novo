import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AppRoutes } from './routes/app.routes'
import { GlobalStyles } from './styles/global/GlobalStyles'
import { lightTheme } from './styles/theme/light-mode'

export function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>

			<GlobalStyles />
		</ThemeProvider>
	)
}
