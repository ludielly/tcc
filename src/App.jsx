import { PlusIcon } from "@phosphor-icons/react"
import Button from "./components/Button/Button.jsx"
import Menu from "./components/Menu/Menu.jsx"
import Input from "./components/Input/Input.jsx"

function App() {
  return (
    <>
      {/* {<Menu />} */}
      <Button icon={PlusIcon} text=" MClicke" />
      <Button icon={PlusIcon} text="Click Me" type="secondary" />
      <Input placeholder="Placeholder" />
    </>
  )
}

export default App
