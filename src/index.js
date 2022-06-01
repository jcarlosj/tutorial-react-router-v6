import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Expenses from './routes/Expenses';
import Invoices from './routes/Invoices';
import Invoice from './routes/Invoice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				{/* Anidacion rutas */}
				<Route path="/" element={ <App /> }>
					<Route path="expenses" element={ <Expenses /> } />		{/* Ruta: "/" + "expenses" */}
					<Route path="invoices" element={ <Invoices /> }>		{/* Ruta: "/" + "invoices" */}
					<Route
						index
						element={
							<main style={{ padding: "1rem" }}>
								<p>Select an invoice</p>
							</main>
						}
					/>
						<Route path=":invoiceId" element={ <Invoice/> } />
					</Route>
				</Route>
				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
							<p>There's nothing here!</p>
						</main>
					}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
