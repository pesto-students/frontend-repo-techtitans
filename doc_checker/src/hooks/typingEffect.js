import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

const TypingEffect = ({ texts, speed, pause }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [forward, setForward] = useState(true);
    const [pauseTyping, setPauseTyping] = useState(false);
  
    useEffect(() => {
      if (pauseTyping) {
        const pauseTimeout = setTimeout(() => {
          setPauseTyping(false);
        }, pause);
        return () => clearTimeout(pauseTimeout);
      }
  
      if (index === texts.length) {
        setIndex(0);
        return;
      }
  
      if (forward && subIndex === texts[index].length + 1) {
        setPauseTyping(true);
        setForward(false);
        return;
      }
  
      if (!forward && subIndex === 0) {
        setPauseTyping(true);
        setForward(true);
        setIndex((prev) => (prev + 1) % texts.length);
        return;
      }
  
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (forward ? 1 : -1));
      }, speed);
  
      return () => clearTimeout(timeout);
    }, [subIndex, index, forward, pauseTyping, texts, speed, pause]);
  
    return (
      <Typography variant="caption" display="block" gutterBottom>
        {`${texts[index].substring(0, subIndex)}${subIndex === texts[index].length ? '' : '|'}`}
      </Typography>
    );
  };

export default TypingEffect;
