import React from 'react'

export const Pagination = ({ entsPerPage, totalEnts, paginate }) => {
    const pageNums = [];

    for(let i = 1; i <= Math.ceil(totalEnts / entsPerPage); i++ ) {
        pageNums.push(i);
    }
    
    
    return (
        <nav>
            <ul className='pagination'>
                {pageNums.map(pageNum => (
                    <li key={pageNum} className='page-item'>
                        <button onClick={() => paginate(pageNum)}  className='page-link'>
                            {pageNum}
                        </button>
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}
