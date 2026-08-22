import Disclosure from "./components/Disclosure";
import { useState } from "react";
import Modal from "./components/Modal";
import Tabs from "./components/Tabs";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <h1>Accessibility Playground</h1>

      <button type="button" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Hello!"
      >
        <p>This is an accessible modal dialog.</p>
      </Modal>

      <h2>Tabs</h2>

      <Tabs
        tabs={[
          {
            label: "First",
            content: <p>This is the first tab.</p>,
          },
          {
            label: "Second",
            content: <p>This is the second tab.</p>,
          },
          {
            label: "Third",
            content: <p>This is the third tab.</p>,
          },
        ]}
      />
<h2>Disclosure</h2>

<Disclosure title="Show details">
  <p>This content can be expanded and collapsed.</p>
</Disclosure>
    </main>
  );
}

export default App;