import React from 'react';
import { CTALink } from './CTALink';
import btnArrow from '../images/btn-arrow.svg';

function App() {
  return (
    <div>
      <CTALink to="" className="text-skin-muted uppercase font-semibold text-xl bg-skin-button-accent hover:bg-skin-button-accent-hover">
        Join us
        <img src={btnArrow} alt="arrow on button" className="inline ml-2 h-6" />
      </CTALink>
    </div>
  );
}

export default App;
