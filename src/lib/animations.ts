import { fade } from "astro:transitions";

// Animation types
export type AnimationType = "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";

// Duration options
export type AnimationDuration = "fast" | "normal" | "slow";

// Delay options - can be preset or number (in seconds)
export type AnimationDelay = "none" | "short" | "medium" | "long" | number;

const durations = {
  fast: "0.2s",
  normal: "0.3s", 
  slow: "0.5s"
};

const presetDelays = {
  none: "0s",
  short: "0.1s",
  medium: "0.2s",
  long: "0.4s"
};

function getDelayValue(delay: AnimationDelay): string {
  if (typeof delay === "number") {
    return `${delay}s`;
  }
  return presetDelays[delay];
}

// Custom slide animations
export const slideLeft = (duration: AnimationDuration = "normal", delay: AnimationDelay = "none") => ({
  forwards: {
    old: {
      name: "slideOutLeft",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    },
    new: {
      name: "slideInLeft",
      duration: durations[duration],
      delay: getDelayValue(delay), 
      easing: "ease-out"
    }
  },
  backwards: {
    old: {
      name: "slideOutRight",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out" 
    },
    new: {
      name: "slideInRight",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    }
  }
});

export const slideRight = (duration: AnimationDuration = "normal", delay: AnimationDelay = "none") => ({
  forwards: {
    old: {
      name: "slideOutRight", 
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    },
    new: {
      name: "slideInRight",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    }
  },
  backwards: {
    old: {
      name: "slideOutLeft",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    },
    new: {
      name: "slideInLeft", 
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    }
  }
});

export const slideUp = (duration: AnimationDuration = "normal", delay: AnimationDelay = "none") => ({
  forwards: {
    old: {
      name: "slideOutUp",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    },
    new: {
      name: "slideInUp",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    }
  },
  backwards: {
    old: {
      name: "slideOutDown",
      duration: durations[duration],
      delay: getDelayValue(delay), 
      easing: "ease-out"
    },
    new: {
      name: "slideInDown",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    }
  }
});

export const slideDown = (duration: AnimationDuration = "normal", delay: AnimationDelay = "none") => ({
  forwards: {
    old: {
      name: "slideOutDown",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    },
    new: {
      name: "slideInDown", 
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    }
  },
  backwards: {
    old: {
      name: "slideOutUp",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    },
    new: {
      name: "slideInUp",
      duration: durations[duration],
      delay: getDelayValue(delay),
      easing: "ease-out"
    }
  }
});

export const fadeIn = (duration: AnimationDuration = "normal", delay: AnimationDelay = "none") => 
  fade({ duration: durations[duration], delay: getDelayValue(delay) });

// Main animation function
export function getAnimation(
  type: AnimationType, 
  duration: AnimationDuration = "normal",
  delay: AnimationDelay = "none"
) {
  switch (type) {
    case "fade":
      return fadeIn(duration, delay);
    case "slideUp":
      return slideUp(duration, delay);
    case "slideDown":
      return slideDown(duration, delay);
    case "slideLeft":
      return slideLeft(duration, delay);
    case "slideRight":
      return slideRight(duration, delay);
    default:
      return fadeIn(duration, delay);
  }
}