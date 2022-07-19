import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import {
  modalBackdropAnimationVariants,
  modalAnimationVariants,
} from "../../utils/animationVariants";

/**
 * The **Modal** component renders a modal in the website
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Modal({ isOpen, onClose, userProfile }) {
  const { userName, userImg, userStory } = userProfile;

  return (
    <motion.div
      className={`fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-skin-fill-base-transparent transition-all ${isOpen ? `modal_opened` : `modal`
        }`}
      onClick={onClose}
      variants={modalBackdropAnimationVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="relative m-0 box-border flex max-h-screen w-72 flex-col gap-6 overflow-y-auto rounded-2xl border border-skin-accent bg-skin-fill-card-accent p-8 xs:w-96 md:w-[620px]"
        onClick={(e) => e.stopPropagation()}
        variants={modalAnimationVariants}>
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={userImg} alt={userName} className="h-40 w-40 max-w-full rounded-full border-4 border-skin-accent" />
          <h3 className="text-center font-balgin text-2xl font-semibold capitalize leading-8 tracking-wider text-skin-primary md:text-4xl">{userName}</h3>
        </div>
        <div className="relative before:absolute before:top-0 before:-left-5 before:h-4 before:w-4 before:bg-[url('./assets/images/icon-quotes.svg')] before:bg-contain before:bg-no-repeat">
          <ReactMarkdown className="markdown">{userStory}</ReactMarkdown>
        </div>
        <button
          className="absolute top-6 right-6 bg-transparent bg-[url('./assets/images/icon-close.svg')] bg-cover bg-no-repeat p-4 transition-all hover:opacity-90"
          onClick={onClose}
        />
      </motion.div>
    </motion.div>
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
