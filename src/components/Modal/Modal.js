import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

/**
 * The **Modal** component renders a modal in the website
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Modal({ isOpen, onClose, userProfile }) {
  const { userName, userImg, userStory } = userProfile;
  return (
    <div
      className={`fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-skin-fill-base-transparent transition-all ${isOpen ? `modal_opened` : `modal`
        }`}
    >
      <div className="relative m-0 box-border flex w-72 flex-col gap-6 rounded-2xl border border-skin-accent bg-skin-fill-card-accent p-8 xs:w-96 md:w-[620px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={userImg} alt={userName} className="h-40 w-40 max-w-full rounded-full border-4 border-skin-accent" />
          <h3 className="text-center font-balgin text-4xl font-semibold uppercase tracking-wider text-skin-primary">{userName}</h3>
        </div>
        <p>{userStory}</p>
        <button
          className="absolute top-6 right-6 bg-transparent bg-[url('./assets/images/icon-close.svg')] bg-cover bg-no-repeat p-4 transition-all hover:opacity-90"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
};

Modal.displayName = "Modal";
Modal.protoTypes = propTypes;

export default Modal;
