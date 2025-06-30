// Componente com os filtros de visualização

import React from "react";

export default function BooksMain(showFilter = true, {children}) {

    

    return (
        <>
            <div>{{children}}</div>
        </>
    )
}