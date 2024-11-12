import React from 'react';
import { sdksType } from '../sdk';

export type SdkContextType = sdksType | undefined;

export const SdkContext = React.createContext<SdkContextType>(undefined);

type UserServiceProviderProps = {
  sdk: sdksType;
  children: React.ReactNode;
};

const SdkProvider: React.FC<UserServiceProviderProps> = ({ sdk, children }) => {
  return (
    <SdkContext.Provider value={sdk}>
      {children}
    </SdkContext.Provider>
  );
};

export default SdkProvider;
