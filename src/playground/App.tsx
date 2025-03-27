import './App.css';
import { useDemoModal } from './modal.config';

function App() {
  const simpleModal = useDemoModal();

  return (
    // Demo of how to use the modal context
    <div
      className="flex gap"
      style={{
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {simpleModal.isModalOpen('modal1') && (
        <dialog open>
          <h2>{simpleModal.getModalData('modal1')?.title}</h2>
          <p>{simpleModal.getModalData('modal1')?.content}</p>
          <button
            onClick={() =>
              simpleModal.showModal('modal1', {
                title: 'Updated Modal 1',
                content: 'This is the updated content for modal 1',
              })
            }
          >
            Close
          </button>
        </dialog>
      )}

      {simpleModal.isModalOpen('modal2') && (
        <dialog open>
          <p>{simpleModal.getModalData('modal2')?.message}</p>
          <button onClick={() => simpleModal.hideModal('modal2')}>Close</button>
        </dialog>
      )}

      {simpleModal.isModalOpen('modal3') && (
        <dialog open>
          <p>{simpleModal.getModalData('modal3')?.info}</p>
          <button onClick={() => simpleModal.hideModal('modal3')}>Close</button>
        </dialog>
      )}

      <button
        onClick={() =>
          simpleModal.showModal('modal1', { title: 'Modal 1', content: 'This is modal 1' })
        }
      >
        Show Modal 1
      </button>

      <button onClick={() => simpleModal.showModal('modal2', { message: 'This is modal 2' })}>
        Show Modal 2
      </button>

      <button onClick={() => simpleModal.showModal('modal3', { info: 'This is modal 3' })}>
        Show Modal 3
      </button>
    </div>
  );
}

export default App;
