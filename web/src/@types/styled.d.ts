import 'styled-components'
import { darkTheme } from '../styles/theme/dark-mode'
import { lightTheme } from '../styles/theme/light-mode'

declare module 'styled-components' {
	type LightThemeType = typeof lightTheme
	type DarkThemeType = typeof darkTheme
	export interface DefaultTheme extends LightThemeType {}
}
