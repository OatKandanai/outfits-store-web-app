import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Message = styled.p`
  margin: 20px 0;
  font-size: 18px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function ConfirmationModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>Confirm Deletion</h2>
        <Message>{message}</Message>
        <Button
          onClick={onConfirm}
          style={{ background: "red", color: "white" }}
        >
          Delete
        </Button>
        <Button
          onClick={onCancel}
          style={{ background: "gray", color: "white" }}
        >
          Cancel
        </Button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default ConfirmationModal;
