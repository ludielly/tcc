import { useState } from "react";
import Button from "./components/Button/Button.jsx"
import Modal from "./components/Modal/Modal.jsx"
import Tag from "./components/Tag/Tag.jsx";
import Select from "./components/Input/Select.jsx";
import Input from "./components/Input/Input.jsx";
import Label from "./components/Label/Label.jsx";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button handleClick={() => setOpen(true)}>
        Abrir
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onSave={() => alert("Processo salvo!")}
        title="Processo"
        subtitle="Novo"
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          <div>
            <Label id="numero">N do processo</Label>
            <Input
              id="numero"
              type="text"
              placeholder="0000/000"
            />
          </div>

          <div>
            <label style={{ fontSize: "13px", color: "#374151" }}>Cliente</label>
            <Select>
              <option>Selecionar cliente...</option>
            </Select>
          </div>

          <div>
            <label style={{ fontSize: "13px", color: "#374151" }}>Status</label>
            <Select>
              <option>Não iniciado</option>
              <option>Em andamento</option>
              <option>Em recurso</option>
              <option>Suspenso</option>
              <option>Encerrado</option>
            </Select>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default App
