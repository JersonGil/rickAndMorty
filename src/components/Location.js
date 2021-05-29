import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import Location from './Skeleton/Location'
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import Alert from 'react-bootstrap/Alert'
import './Location.css';
import Button from 'react-bootstrap/Button'

const getLocation = gql`
  query getLocations($page: Int, $filter: FilterLocation)  {
    locations(page: $page, filter: $filter) {
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
  const [filter, setFilter] = useState({
    name: '',
    type: '',
    dimension: ''
  })

  const { loading, data, error } = useQuery(getLocation, { variables: { page: activePage, filter }, fetchPolicy: "network-only"  })

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }

  return (
    <div className="Location container mt-5">
        {
          error && <Alert variant="danger">error</Alert>
        }
        <div className="d-flex justify-content-center button-filters">
          <Dropdown
            data={data && data}
            setFilter={setFilter}
            title="Name"
            type="name"
          />
          <Dropdown
            data={data && data}
            setFilter={setFilter}
            title="Type"
            type="type"
          />
          <Dropdown
            data={data && data}
            setFilter={setFilter}
            title="Dimension"
            type="dimension"
          />
          <Button onClick={() => setFilter({ name: '', type: '', dimension: '' })} variant="primary">Reset Filters</Button>
        </div>
      {
        loading ? (<Location />) : (
          <div className="card-columns justify-content-center">
            <div className="row my-4">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={data && data.locations.info.count}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
          </div>
            {
              data && data.locations.results.map(result => (
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
                      <div className="col">
                        <Link to={`/residents/${result.id}`}>Residents</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}

export default Locations;
