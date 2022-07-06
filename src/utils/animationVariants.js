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
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 0.2,
      damping: 20,
    },
  },
}

export {
  sectionAnimationVariants,
  partnersImagesAnimationVariants,
};