import { ChartPieSliceIcon, FolderSimpleIcon, UserIcon, UsersThreeIcon } from "@phosphor-icons/react"
import './Menu.css'
import logo from '../../assets/logo.svg';
import MenuItem from "../MenuItem.jsx/MenuItem";
import { Link, NavLink } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="menu-list">
        <MenuItem icon={<ChartPieSliceIcon />} text="Dashboard" page="/" />
        <MenuItem icon={<UsersThreeIcon />} text="Clientes" page="clientes" />
        <MenuItem icon={<UserIcon />} text="Advogados" page="advogados" />
        <MenuItem icon={<FolderSimpleIcon />} text="Processos" page="processos" />
      </ul>
    </div>
  )
}

export default Menu
