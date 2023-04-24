import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  heroLetterContainerAnimationVariants,
  heroLetterAnimationVariants,
} from '../utils/animationVariants';

function AnimatedHeroTitle({ children }) {
  return (
    <AnimatePresence>
      <motion.h1
        className="relative inline-block w-full max-w-screen-md break-words text-center font-balgin text-4xl tracking-wider text-transparent drop-shadow sm:text-left lg:text-6xl"
        variants={heroLetterContainerAnimationVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: true }}>
        {children.split(" ").map((word, index) => (
          <div
            key={`word-${word}-${index}`}
            style={{
              display: "inline-block"
            }}
          >
            {Array.from(word).map((letter, index) => (
              <motion.span
                key={`${index}-${letter}`}
                className="relative inline-block w-auto bg-gradient-to-l from-orange-600 to-skin-accent bg-clip-text"
                variants={heroLetterAnimationVariants}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
            {"\u00A0"}
          </div>
        ))}
      </motion.h1>
    </AnimatePresence >
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
}

AnimatedHeroTitle.displayName = 'AnimatedHeroTitle';
AnimatedHeroTitle.propTypes = propTypes;

export default AnimatedHeroTitle;