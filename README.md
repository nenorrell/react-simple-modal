# React Simple Modal (RSM)

<p align="center">
  <img src="./public/logo.png" alt="React Simple Modal Logo" width="200"/>
</p>

**React Simple Modal (RSM)** is a lightweight, hook-based modal management library for React. It leverages React Context and custom hooks to offer an intuitive, type-safe API for handling multiple modals—making it easy to show, hide, update, and persist modal state across your app.

---

## 📚 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
  - [1. Define Your Modals](#1-define-your-modals)
  - [2. Wrap Your App with the Provider](#2-wrap-your-app-with-the-provider)
  - [3. Use the Hook to Control Modals](#3-use-the-hook-to-control-modals)

---

## ✨ Features

- **Hook-Based API** – Manage modal visibility and data using intuitive custom hooks.
- **Flexible State Handling** – Merge modal data, persist content after close, or update modal state without toggling visibility.
- **Type-Safe** – Written in TypeScript with full type safety for both modal data and state.
- **Modern Build Outputs** – Supports both ESM and CommonJS for seamless integration.

---

## 📦 Installation

Using npm:

```bash
npm install react-simple-modal
```

Using yarn:

```bash
yarn add react-simple-modal
```

## 🚀 Quick Start

1. Define Your Modals
Create a typed configuration for your modal registry:

```typescript
// modal.config.ts
import { simpleModalFactory } from 'react-simple-modal';

export type DemoModals = {
  modal1: { title: string; content: string };
  modal2: { message: string };
};

export const { ModalProvider: DemoModalProvider, useModal: useDemoModal } =
  simpleModalFactory<DemoModals>({
    modal1: { isShowing: false, data: undefined },
    modal2: { isShowing: false, data: undefined },
  });

```

2. Wrap Your App/component with the Provider

```typescript
// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DemoModalProvider } from './modal.config';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoModalProvider>
      <App />
    </DemoModalProvider>
  </StrictMode>
);
```

3. Use the Hook to Control Modals

```tsx
// App.tsx
import { useDemoModal } from './modal.config';

function App() {
  const modal = useDemoModal();

  return (
    <div
      className="flex gap"
      style={{
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {modal.isModalOpen('modal1') && (
        <dialog open>
          <h2>{modal.getModalData('modal1')?.title}</h2>
          <p>{modal.getModalData('modal1')?.content}</p>
          <button
            onClick={() =>
              modal.showModal('modal1', {
                title: 'Updated Modal 1',
                content: 'This is the updated content for modal 1',
              })
            }
          >
            Update
          </button>
        </dialog>
      )}

      {modal.isModalOpen('modal2') && (
        <dialog open>
          <p>{modal.getModalData('modal2')?.message}</p>
          <button onClick={() => modal.hideModal('modal2')}>Close</button>
        </dialog>
      )}

      <button
        onClick={() =>
          modal.showModal('modal1', { title: 'Modal 1', content: 'This is modal 1' })
        }
      >
        Show Modal 1
      </button>

      <button onClick={() => modal.showModal('modal2', { message: 'This is modal 2' })}>
        Show Modal 2
      </button>
    </div>
  );
}

export default App;
```