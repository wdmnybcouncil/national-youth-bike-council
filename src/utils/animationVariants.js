const navBarAnimationVariants = {
  hidden: {
    opacity: 0,
    y: "-20",
    scaleY: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      type: "spring",
      stiffness: 125,
      mass: 0.2,
      damping: 20,
    }
  }
}

const heroLetterContainerAnimationVariants = {
  hidden: { transition: { staggerChildren: 0.015 } },
  visible: { transition: { staggerChildren: 0.05 } }
}

const heroLetterAnimationVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  }
}

const heroImageAnimationVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "easeOut",
      duration: 1,
    },
  },
}

const sectionAnimationVariants = {
  hidden: {
    opacity: 0,
    y: -25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      delay: 0.2,
      duration: 2,
    },
  }
}

const partnersImagesAnimationVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "easeOut",
      duration: 1,
    },
  },
}

const postAnimationVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "easeOut",
      duration: 1,
    },
  },
}

const modalBackdropAnimationVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "easeOut",
    },
  },
  exit: {
    opacity: 0,
  },
}

const modalAnimationVariants = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
}

export {
  heroLetterContainerAnimationVariants,
  heroLetterAnimationVariants,
  heroImageAnimationVariants,
  navBarAnimationVariants,
  sectionAnimationVariants,
  partnersImagesAnimationVariants,
  postAnimationVariants,
  modalBackdropAnimationVariants,
  modalAnimationVariants,
};