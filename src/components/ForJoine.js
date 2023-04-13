import React, { useState } from "react";
import {
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  DropdownMenu,
} from "reactstrap";

const ForJoine = (props) => {
  console.log("props user ", props.user);
  let [selectedUsers, setSelectedUsers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  let [dropdownOpen, setOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  let handleUserSelection = (selectedUser) => {
    if (selectedUsers.includes(selectedUser)) {
      setSelectedUsers(selectedUsers.filter((user) => user !== selectedUser));
    } else {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  };

  localStorage.setItem("ReceiverIds", [selectedUsers]);

  return (
    <div>
      <ButtonDropdown
        toggle={() => {
          setOpen(!dropdownOpen);
        }}
        isOpen={dropdownOpen}
      >
        <DropdownToggle className="bg-primary" caret>
          Invite Users
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Select users</DropdownItem>
          {props.user.map((user) => (
            <DropdownItem
              key={user.id}
              onClick={() => handleUserSelection(user._id)}
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              {user.fname}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

export default ForJoine;
