import { AnimationRouterDirectionType, AnimationRouterContextType } from 'zmp-ui/router'
import { PAGE_TRANSITION_DIRECTION } from 'zmp-ui/esm/components/router/common/constant'
import React, { useCallback, useMemo, useRef, useState, ReactNode } from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

export const AnimationRouterContext = React.createContext<AnimationRouterContextType | undefined>(undefined)

interface AnimationRouterProps {
  children: ReactNode;
  memoryRouter?: boolean;
  basepath?:  string;
}

const AnimationRouter: React.FC<AnimationRouterProps> = ({ children, memoryRouter = false, basepath = '' }) => {
  const [animate, setAnimate] = useState(true);
  const [direction, setDirection] = useState<AnimationRouterDirectionType>(PAGE_TRANSITION_DIRECTION.FORWARD);
  const pageScrollPosition = useRef<Record<string, number>>({});

  const handleSetAnimate = useCallback(
    ({ animate = true, direction = PAGE_TRANSITION_DIRECTION.FORWARD }: { animate?: boolean; direction?: AnimationRouterDirectionType }) => {
      setAnimate(!!animate);
      setDirection(
        [PAGE_TRANSITION_DIRECTION.FORWARD, PAGE_TRANSITION_DIRECTION.BACKWARD].includes(direction)
          ? direction
          : PAGE_TRANSITION_DIRECTION.FORWARD
      );
    },
    []
  );

  const updateScrollPosition = (key: string, position: number) => {
    pageScrollPosition.current[key] = position;
  };

  const contextValue = useMemo(
    () => ({
      setAnimate: handleSetAnimate,
      animate,
      direction,
      pageScrollPosition: pageScrollPosition.current,
      updatePosition: updateScrollPosition,
    }),
    [animate, direction, handleSetAnimate]
  );

  const RouterComponent = memoryRouter ? MemoryRouter : BrowserRouter;
  const routerProps = memoryRouter ? { initialEntries: [basepath] } : {};

  return (
    <AnimationRouterContext.Provider value={contextValue}>
      <RouterComponent basename={basepath} {...routerProps}>
        {children}
      </RouterComponent>
    </AnimationRouterContext.Provider>
  );
};

export default AnimationRouter;
