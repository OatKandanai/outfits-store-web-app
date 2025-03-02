import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect } from "react";

const Container = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 999;
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 12px 20px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

function NotificationModal({
  isShowNotification,
  setIsShowNotification,
  message,
}) {
  // Timer for modal to disappear
  useEffect(() => {
    if (isShowNotification) {
      const timer = setTimeout(() => {
        setIsShowNotification(false);
      }, 2000); // Hide modal after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isShowNotification, setIsShowNotification]);

  return (
    <Container
      style={{
        opacity: isShowNotification ? 1 : 0,
        visibility: isShowNotification ? "visible" : "hidden",
        transform: isShowNotification
          ? "translate(-50%, 0px)"
          : "translate(-50%, -20px)",
      }}
    >
      <CheckIcon style={{ color: "lime" }} /> {message}
    </Container>
  );
}

export default NotificationModal;
