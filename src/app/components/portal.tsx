import { useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  selector: string;
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ selector, children }) => {
  const portalRef = useRef<Element | null>(null);

  useEffect(() => {
    const portalElement = document.querySelector(selector);
    portalRef.current = portalElement;

    return () => {
      portalRef.current = null;
    };
  }, [selector]);

  if (!portalRef.current) {
    return null;
  }

  return ReactDOM.createPortal(children, portalRef.current);
};

export default Portal;
