import React from 'react'
import { Nav } from 'react-bootstrap'

const Header = () => (
    <Nav activeKey="/">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/locations">Locations</Nav.Link>
      </Nav.Item>
    </Nav>
)

export default Header
