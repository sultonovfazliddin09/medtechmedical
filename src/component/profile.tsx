import { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { LogoutButton } from "./logout";
import { api } from "../service/api";

const Profile = () => {
  const [user, setUser] = useState<{ email?: string; role?: string }>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
      >
        Profile
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>{user.email}</MenuItem>
        <MenuItem onClick={handleClose}>{user.role}</MenuItem>
        <MenuItem onClick={handleClose}>
          <LogoutButton />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
