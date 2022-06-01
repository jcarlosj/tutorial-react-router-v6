import { NavLink, Outlet } from 'react-router-dom';

import { getInvoices } from "../data";

export default function Invoices() {

    let invoices = getInvoices();

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Invoices</h2>
            <div style={{ display: "flex" }}>
                <nav
                    style={{
                        borderRight: "solid 1px",
                        padding: "1rem",
                    }}
                >
                    {   invoices.map( ( invoice ) => (
                            <NavLink
                                className={ ({ isActive }) => isActive ? "link link-red" : "link link-blue" }
                                to={ `/invoices/${ invoice.number }` }
                                key={ invoice.number }
                            >
                                { invoice.name }
                            </NavLink>
                    ))}
                </nav>
                <Outlet />
            </div>
        </main>
    );
}