import { PlusIcon } from "@phosphor-icons/react"
import Button from "./components/Button/Button.jsx"
import Menu from "./components/Menu/Menu.jsx"

function App() {
  return (
    <>
      {/* <Menu /> */}
      <Button icon={<PlusIcon />} text=" MClicke" />
      <Button text="Click Me" type="outline" />
    </>
  )
}

export default App
