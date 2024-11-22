import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { HomePage } from './page/home';
import { PhotographerPage } from './page/photographer';

const router = createBrowserRouter([
	{
		path: '/home',
		element: <HomePage />,
	},
	{
		path: '/photographer/:id',
		element: <PhotographerPage />,
	},
	{
		path: '*',
		element: <Navigate to="/home" replace />,
	},
]);

function App() {
	return (
		<div className="App">
			<Header />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
