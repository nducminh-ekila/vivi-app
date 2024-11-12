import {
  To,
  ZMPNavigationFunction,
  ZMPNavigationOptions,
  default as useNavigateZMP,
} from 'zmp-ui/useNavigate';
import { useCallback, useContext } from 'react';
import { useNavigate as useDefaultNavigate } from 'react-router-dom';
import { AnimationRouterContext } from '../components/router';

const useNavigate = (): ZMPNavigationFunction => {
    const context = useContext(AnimationRouterContext);
    if (!context) return useNavigateZMP();
    
    const navigate = useDefaultNavigate();

    return useCallback(
        (to: To, options: ZMPNavigationOptions) => {
            const { animate = true, direction = 'forward' } = options || {};

            context!.setAnimate({
                animate,
                direction,
            });

            if (typeof to === 'number') {
                navigate(to);
            } else {
                navigate(to, options);
            }
        },
        [context, navigate]
    ) as ZMPNavigationFunction;
};

export default useNavigate;

