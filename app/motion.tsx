"use client";

import { motion, MotionProps } from "framer-motion";

interface AnimatedProps extends MotionProps {
  as: string;
  children: React.ReactNode;
  className: string;
}

export function Animated({ as, children, className, ...rest }: AnimatedProps) {
  // @ts-ignore
  const Element = motion[as];

  return (
    <Element className={className} {...rest}>
      {children}
    </Element>
  );
}
