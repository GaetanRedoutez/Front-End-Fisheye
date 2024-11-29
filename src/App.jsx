import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { HomePage } from './page/home';
import { PhotographPage } from './page/photographer';

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

const router = createBrowserRouter([
	{
		element: <Layout />,
		path: '/',
		children: [
			{
				path: 'home',
				element: <HomePage />,
			},
			{
				path: 'photograph/:id',
				element: <PhotographPage />,
			},
		],
	},
]);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
