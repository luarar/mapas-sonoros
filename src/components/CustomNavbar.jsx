import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomNavbar.css'

export default class CustomNavbar extends Component {
  render() {
    return (
      <Nav defaultActiveKey="/home" as="ul" className="custom-nav">
        <Nav.Item as="li">
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">About</Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }
}