import { Route, Routes } from 'react-router-dom'
import { Layout } from '../layout'
import { Home } from '../pages/Home'

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />} />
			</Route>
		</Routes>
	)
}
