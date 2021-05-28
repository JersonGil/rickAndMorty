import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import Location from './Skeleton/Location'
import Pagination from "react-js-pagination";
import './Location.css';

const getLocation = gql`
  query getLocations($page: Int)  {
    locations(page: $page) {
      info {
        pages
        next
        prev
        count
      }
      results {
        id
        dimension
        name
        type
      }
    }
}
`

function Locations() {
  const [activePage, setActivePage] = useState(1)

  const { loading, data, error } = useQuery(getLocation, { variables: { page: activePage }} )

  if (loading) return (<Location />)
  if (error) return `Error: ${error}`

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  }

  return (
    <div className="Location container mt-5">
        <div className="row justify-content-end">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={data.locations.info.count}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      <div className="card-columns justify-content-center">
        {
          data.locations.results.map(result => (
            <div className="card-list">
              <div className="content">
                <div className="row">
                  <div className="col">
                    <h3>Name: </h3>
                    <label>{result.name}</label>
                  </div>
                  <div className="col">
                    <h3>Type: </h3>
                    <label>{result.type}</label>
                  </div>
                  <div className="col">
                    <h3>Dimension: </h3>
                    <label>{result.dimension}</label>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Locations;
