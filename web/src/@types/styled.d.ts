import 'styled-components'
// import { darkTheme } from '../theme/dark-mode'
import { lightTheme } from '../theme/light-mode'

declare module 'styled-components' {
	type LightThemeType = typeof lightTheme
	// type DarkThemeType = typeof darkTheme
	export interface DefaultTheme extends LightThemeType, DarkThemeType {}
}
