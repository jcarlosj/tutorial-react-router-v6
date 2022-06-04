import { NavLink, Outlet, useSearchParams, useLocation } from 'react-router-dom';

import { getInvoices } from "../data";

export default function Invoices() {

    let
        invoices = getInvoices(),
        [ searchParams, setSearchParams ] = useSearchParams();  // * useSearchParams: Establecemos el valor de la entrada a lo que sea que esté en el parámetro de búsqueda de filtro (¡es como useState, pero en URLSearchParams en su lugar!)

    function QueryNavLink({ to, name, ...props }) {
        let location = useLocation();

        console.log( 'location.search', location.search );
        console.log( 'props', props );

        return <NavLink to={ to + location.search } { ...props } >{ name }</NavLink>
    }

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
                                QueryNavLink({ 
                                    to: `/invoices/${ invoice.number }`,
                                    name: invoice.name, 
                                    className: ({ isActive }) => isActive ? "link link-red" : "link link-blue",
                                    key: invoice.number
                                })
                            ))
                    }
                </nav>
                <Outlet />
            </div>
        </main>
    );
}