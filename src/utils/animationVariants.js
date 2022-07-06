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

export {
  sectionAnimationVariants,
};