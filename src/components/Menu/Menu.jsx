import { ChartPieSliceIcon, FolderSimpleIcon, UserIcon, UsersThreeIcon } from "@phosphor-icons/react"
import './Menu.css'
import logo from '../../assets/logo.svg';
import MenuItem from "../MenuItem.jsx/MenuItem";

function Menu() {
  return (
    <div className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="menu-list">
        <MenuItem icon={<ChartPieSliceIcon />} text="Dashboard" />
        <MenuItem icon={<UsersThreeIcon />} text="Clientes" />
        <MenuItem icon={<UserIcon />} text="Advogados" />
        <MenuItem icon={<FolderSimpleIcon />} text="Processos" />
      </ul>
    </div>
  )
}

export default Menu
