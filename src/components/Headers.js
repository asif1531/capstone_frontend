import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,NavItem,Modal,ModalHeader,ModalBody,ModalFooter,
} from "reactstrap";
const Headers = () => {
  // let navigate = useNavigate();
  let userId = localStorage.getItem("userId");
  let number = localStorage.getItem("phonnumber");
  let name = localStorage.getItem("usefName");
  let data = [userId, number, name];
  console.log(data);

  let [isModalOpen, setIsModalOpen] = useState(false);
  

  let toggleModal = () => setIsModalOpen(!isModalOpen);
  const [isHovered, setIsHovered] =useState(false);

  const buttonHoverStyle = {
    color: 'red',
    backgroundColor: "white",
    filter: 'brightness(130%)'
  };

  const buttonStyle = {
    color: 'white',
  marginLeft: '1100px',
  textDecoration: 'none',
  fontSize: '20px'
  };
 

  let logout = () => {
    localStorage.clear();
    window.location.href = "/";
    
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
 

  return (
    <>
      {userId ? (
        <Navbar className="my-0" dark sticky="top">
          <NavbarBrand href="/">BestLocations</NavbarBrand>
          
          <Nav className="ml-auto" navbar>
          <NavItem>
            <Button color="link" onClick={toggleModal} 
             style={{ ...buttonStyle, ...(isHovered ? buttonHoverStyle : {}),color:"white",
             marginLeft:1100,textDecoration:"none",fontSize:20 }}
             onMouseOver={handleMouseOver}
             onMouseOut={handleMouseOut}
             >
              User
            </Button>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button color="link" onClick={logout} style={{color:"white", textDecoration:"none", fontSize:20,marginRight:50}}>
              Logout
            </Button>
          </NavItem>
        </Nav>
        

          <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>User Data</ModalHeader>
        <ModalBody>
          <p>Name:      {data[2]} </p>
          <p>Id:   {  data[0]} </p>
          <p>Phone:    {data[1]} </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>


          {/* <div>
            <Nav tabs>
              <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                  nav
                  caret
                  style={{ color: "white", marginRight: 20 }}
                >
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem style={{ color: "black" }} onClick={getUser}>
                    User
                  </DropdownItem>
                  <DropdownItem style={{ color: "black" }} onClick={logout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav> */}
          {/* </div> */}
          {/* <Input  className="search"style={{ width: "40%" }}
     placeholder="Search Posts"
    //  onChange={data=(e)=>e.target.value}
  /> */}
        </Navbar>
      ) : (
        <Navbar className="my-0" dark>
          <NavbarBrand>BestLocation</NavbarBrand>
        </Navbar>
      )}
    </>
  );
};

export default Headers;
