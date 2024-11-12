import { AnimationRoutes as ZMPAnimationRoutes} from 'zmp-ui';
import { AnimationRoutesProps } from 'zmp-ui/router';
import { getPrefixCls } from "zmp-ui/esm/utils/class";
import { iOS } from "zmp-ui/esm/utils/device";
import { NO_ANIMATION_DURATION, ANIMATION_DURATION, PAGE_TRANSITION_DIRECTION } from "zmp-ui/esm/components/router/common/constant";
import React, { useMemo, useRef, useEffect, cloneElement, useContext, useCallback } from "react";
import { NavigationType, useNavigationType, useLocation, Routes } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classNames from "clsx";
import { AnimationRouterContext } from "./router";

const AnimationRoutes = ({ children }: AnimationRoutesProps): React.ReactNode => {
  const navigationType = useNavigationType();
  const direction = useRef(PAGE_TRANSITION_DIRECTION.FORWARD);
  const context = useContext(AnimationRouterContext);
  
  if (!context) return <ZMPAnimationRoutes>{children}</ZMPAnimationRoutes>;
  
  const { animate, setAnimate, direction: directionSetting } = context || {};
  const location = useLocation();
  const pathname = location.pathname;
  const initialX = useRef(null);
  const initialY = useRef(null);
  const nodeRefs = useRef({});
  const prefixCls = getPrefixCls("routes");

  const getKey = (path) => {
    if (!path) return "";
    let pathToCompare = path.charAt(0) !== "/" ? "/" + path : path;
    if (pathToCompare.lastIndexOf("/") > 0) {
      pathToCompare = pathToCompare.substring(0, pathToCompare.length - 1);
    }
    return pathToCompare;
  };

  const getNodeRef = useCallback((path) => {
    const key = getKey(path);
    if (!key) return null;
    if (!nodeRefs.current[String(key)]) {
      nodeRefs.current[String(key)] = React.createRef();
    }
    return nodeRefs.current[String(key)];
  }, []);

  const routList = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const elementChild = child as React.ReactElement;
        const { element, ...restProps } = elementChild.props;

        if (!element || element.props.replace === true) return elementChild;

        return cloneElement(elementChild, {
          ...restProps,
          element: element
        });
      }
      return child;
    });
  }, [children]);

  const startTouch = (e) => {
    initialX.current = e.touches[0].clientX;
    initialY.current = e.touches[0].clientY;
  };

  const moveTouch = (e) => {
    if (initialX.current === null || initialY.current === null) {
      return;
    }
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = initialX.current - currentX;
    const diffY = initialY.current - currentY;

    if (initialX.current <= 24 && Math.abs(diffX) > Math.abs(diffY) && diffX <= 0 && animate) {
      e.preventDefault();
      setAnimate?.({ animate: false });
      e.preventDefault();
    }

    initialX.current = null;
    initialY.current = null;
  };

  useEffect(() => {
    const isIOS = iOS();
    if (isIOS) {
      document.addEventListener("touchstart", startTouch, { passive: false });
      document.addEventListener("touchmove", moveTouch, { passive: false });
    }
    return () => {
      if (isIOS) {
        document.removeEventListener("touchstart", startTouch);
        document.removeEventListener("touchmove", moveTouch);
      }
    };
  }, []);

  if (animate) {
    direction.current = navigationType === NavigationType.Pop ? PAGE_TRANSITION_DIRECTION.BACKWARD : directionSetting || PAGE_TRANSITION_DIRECTION.FORWARD;
  }

  const animationCls = classNames({
    [`${prefixCls}-${direction.current}`]: animate,
    [`${prefixCls}-no-animation`]: !animate,
  });

  const wrapperCls = classNames(prefixCls);

  const nodeRef = useMemo(() => getNodeRef(pathname), [pathname, getNodeRef]);

  return (
    <TransitionGroup className={wrapperCls} childFactory={(child) => cloneElement(child, {
      classNames: animationCls,
      timeout: animate ? ANIMATION_DURATION : NO_ANIMATION_DURATION,
    })}>
      <CSSTransition
        key={pathname}
        timeout={animate ? ANIMATION_DURATION : NO_ANIMATION_DURATION}
        onExited={() => setAnimate?.({ animate: true, direction: PAGE_TRANSITION_DIRECTION.FORWARD })}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef} className={`${prefixCls}-item`}>
          <Routes location={location}>
            {routList}
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimationRoutes;
