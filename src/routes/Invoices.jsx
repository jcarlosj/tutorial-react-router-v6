import { NavLink, Outlet, useSearchParams } from 'react-router-dom';

import { getInvoices } from "../data";

export default function Invoices() {

    let
        invoices = getInvoices(),
        [ searchParams, setSearchParams ] = useSearchParams();  // * useSearchParams: Establecemos el valor de la entrada a lo que sea que esté en el parámetro de búsqueda de filtro (¡es como useState, pero en URLSearchParams en su lugar!)

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
                    <input
                        value={ searchParams.get( 'filter' ) || '' }
                        onChange={ ( event ) => {
                            let filter = event.target.value;
                            
                            
                            if ( filter )
                                setSearchParams({ filter });    // * setSearchParams() está poniendo los '?filter=...' parámetros de búsqueda en la URL y volviendo a renderizar el enrutador. 
                            else 
                                setSearchParams({});
                            
                        }}
                    />

                    {   invoices
                            .filter( ( invoice ) => {           // * Filtramos nuestra lista de facturas según el parámetro de búsqueda de filtro.
                                let filter = searchParams.get( 'filter' );
                                
                                if ( ! filter ) return true;

                                let name = invoice.name.toLowerCase();

                                return name.startsWith( filter.toLowerCase() );
                            })
                            .map( ( invoice ) => (
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