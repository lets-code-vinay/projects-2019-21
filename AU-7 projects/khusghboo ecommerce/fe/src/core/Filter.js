import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from '../backend'
import Base from '../core/Base'
import Card from './Card'

export default function Filter({ match, location }) {

  const [data, setData] = useState([]);
  let [isNext, setIsNext] = useState(true)
  let [isFilter, setIsFilter] = useState(false)
  const [filterData, setfilterData] = useState([]);

  const category = match.params.categoryId
  const pathLocation = match.path.split('/')[2]
  let currentPageCount = parseInt(match.params.pageNum)
  let nextPage = currentPageCount + 1

  const getProductsByCategory = () => {

    let request = axios({
      method: "GET",
      url: `${API}/product/filterByCategory/${category}/${currentPageCount}`,
    });
    request.then((res) => {
      isNext = res.data.isNext
      if (isFilter) {
        setData(filterData);
      } else {
        setData(res.data.products);
      }
      setIsNext(isNext)
    });
  }
  const getSearch = () => {
    //console.log('location', location)
    let request = axios({
      method: "GET",
      url: `${API}/product/search/${location.search}`,
    });
    request.then((res) => {
      if (isFilter) {
        setData(filterData);
      } else {
        setData(res.data);
      }
    });
  };

  const handleFilter = (filter) => {
    if (filter === "LtoH") {
      const LtoH = [...data]
      LtoH.sort((a, b) => parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice));
      setfilterData(LtoH)
      setIsFilter(true)
    }
    if (filter === "HtoL") {
      const HtoL = [...data]
      HtoL.sort((a, b) => parseFloat(b.discountedPrice) - parseFloat(a.discountedPrice));
      setfilterData(HtoL)
      setIsFilter(true)
    }
  }

  useEffect(() => {
    if (pathLocation === "search") {
      getSearch();
    } else {
      getProductsByCategory()
    }

  }, [getProductsByCategory, getSearch, pathLocation]);

  return (
    <Base>
      <div className="btn-group mt-3 mr-2" style={{ "display": "flex", "flex-direction": "column", "align-items": "flex-end" }}>
        <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Filter
  </button>
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => { handleFilter("LtoH") }}>Price: Low to High</div>
          <div className="dropdown-item" onClick={() => { handleFilter("HtoL") }}>Price: High to Low</div>
        </div>
      </div>
      <div className="filterProduct" style={{ "minHeight": "350px" }}>
        {data.map((product) => {
          return (
            <Card product={product} />
          )
        })}

      </div>
      {
        pathLocation === "search" ? null :
          <nav aria-label="Page navigation example" style={{ "marginTop": "30px" }}>
            <ul className="pagination justify-content-center">
              <li className={currentPageCount === 1 ? "page-item disabled" : "page-item"}>
                <Link className="page-link" href="#" tabindex="-1" to={`/products/all/${category}/${currentPageCount - 1}`} > Previous</Link>
              </li>
              <li className="page-item active"><Link className="page-link" to={`/products/all/${category}/${currentPageCount}`}>{currentPageCount}</Link></li>
              {
                isNext ? <li className="page-item"><Link className="page-link" to={`/products/all/${category}/${nextPage}`}>{nextPage}</Link></li>
                  : null
              }
              <li className={isNext ? "page-item" : "page-item disabled"} >
                <Link className="page-link" to={`/products/all/${category}/${nextPage}`}>Next</Link>
              </li>
            </ul>
          </nav>
      }
    </Base >

  );
}
