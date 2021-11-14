import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
const SearchPage = () => {
    const [search, setSearch] = useState([]);
    const [result, setResult] = useState([])

    useEffect(()=>{
        fetch(`/api/profile/search/${search}`, {
            method: 'GET'
        })
        .then((res)=> res.json())
        .then((data)=> {
            console.log(data.profile)
            setResult(data.profile)
            
        })
    }, [search])
    return (
        <div>
        
            <input placeholder='Search Developers...' style={{padding: '5px 150px 10px 10px', borderRadius: '5px'}} type="search" value={search} onChange={(e)=> setSearch(e.target.value)} />
            
            {
                result.map((e)=>(
                    <div className="card card-body bg-light mb-12">
                    <div className="row">
                        
                        <div className="col-2">
                            <img
                            src={e.avatar}
                            alt="User Avatar"
                            className="rounded-circle"
                            />
                        </div>
                    
                    </div>
                        <h2>{e.name}</h2>
                        <Link to={`/profile/${e.name}`} className="btn btn-info">View Profile</Link>
                    </div>
                ))
            }

        </div>
    )
}

export default SearchPage;
