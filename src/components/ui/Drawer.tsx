import { useEffect, type ReactNode } from "react";
import "./Drawer.css";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: number | string;
  children: ReactNode;
};

const Drawer = ({ isOpen, onClose, title, width = 420, children }: DrawerProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label={title ?? "Panel lateral"}>
      <button className="drawer__overlay" onClick={onClose} aria-label="Cerrar panel" />
      <aside className="drawer__panel" style={{ width }}>
        <header className="drawer__header">
          {title ? <h2 className="drawer__title">{title}</h2> : <span />}
          <button className="drawer__close" onClick={onClose} aria-label="Cerrar">
            x
          </button>
        </header>
        <div className="drawer__content">{children}</div>
      </aside>
    </div>
  );
};

export default Drawer;
