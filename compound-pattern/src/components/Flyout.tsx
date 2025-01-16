import React, { createContext, useContext, useState, ReactNode } from "react";
import { Icon } from "./icon";

// Define the context value type
interface FlyoutContextType {
  open: boolean;
  toggle: (value: boolean) => void;
}

// Create the context with a default value of `null`
// (we’ll check for null in the `useContext` hook to ensure it’s used properly)
export const FlyoutContext = createContext<FlyoutContextType | null>(null);

// Define props types
interface FlyOutProps {
  children: ReactNode;
}

// Flyout Component
export const Flyout = (props: FlyOutProps) => {
  const [open, setOpen] = useState(false);

  const toggle = (value: boolean) => setOpen(value);

  return (
    <FlyoutContext.Provider value={{ open, toggle }}>
      <div className="flyout">{props.children}</div>
    </FlyoutContext.Provider>
  );
};

// Toggle Component
function Toggle() {
  const context = useContext(FlyoutContext);

  if (!context) {
    throw new Error("Toggle must be used within a Flyout.Provider");
  }

  const { open, toggle } = context;

  return (
    <div className="flyout-btn" onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

// List Component
function List({ children }: FlyOutProps) {
  const context = useContext(FlyoutContext);

  if (!context) {
    throw new Error("List must be used within a Flyout.Provider");
  }

  const { open } = context;

  return open ? <ul className="flyout-list">{children}</ul> : null;
}

// Item Component
function Item({ children }: FlyOutProps) {
  return <li className="flyout-item">{children}</li>;
}

// Attach subcomponents to Flyout
Flyout.Toggle = Toggle;
Flyout.List = List;
Flyout.Item = Item;
