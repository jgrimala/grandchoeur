// src/components/auth/LoginModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "./LoginForm";

const LoginModal = ({ closeModal, openRegisterModal }) => {
	return ReactDOM.createPortal(
		<div className="modal-overlay" onClick={closeModal}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close-button" onClick={closeModal}>
					&times;
				</button>
				<LoginForm closeModal={closeModal} openRegisterModal={openRegisterModal} />
			</div>
		</div>,
		document.getElementById("modal-root")
	);
};

export default LoginModal;
