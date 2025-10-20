import React from "react";
import { XIcon } from "@phosphor-icons/react";
import "./Modal.css"
import Button from "../Button/Button";

export function Modal({ open, onClose, onSave, title, subtitle, children }) {
  if (!open) return null;

  return (
     <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{title}</h2>
            {subtitle && <p className="modal-subtitle">
                {title}
                {subtitle}</p>}
          </div>
          <button className="modal-close" onClick={onClose}>
            <XIcon size={20} weight="bold" />
          </button>
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <Button onClick={onSave}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal