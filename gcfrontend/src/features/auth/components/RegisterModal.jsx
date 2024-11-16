// src/components/auth/RegisterModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import RegisterForm from "./RegisterForm";

const RegisterModal = ({ closeModal, openLoginModal }) => {
	return ReactDOM.createPortal(
		<div className="modal-overlay" onClick={closeModal}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close-button" onClick={closeModal}>
					&times;
				</button>
				<RegisterForm closeModal={closeModal} openLoginModal={openLoginModal} />
			</div>
		</div>,
		document.getElementById("modal-root")
	);
};

export default RegisterModal;
