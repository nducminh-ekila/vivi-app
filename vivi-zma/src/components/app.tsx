import React, { useContext, useEffect } from "react";
import { ZMPRouter } from "zmp-ui";
import { RecoilRoot, useSetRecoilState } from "recoil";
import CommonApp from 'common/app'
import SdkProvider, { SdkContext, SdkContextType } from 'common/contexts/sdk.context';
import { ZaloSdk } from "common/sdk";
import { userState } from "common/state";

const BaseApp = (props) => {
  // handle side effects
  const sdk = useContext<SdkContextType>(SdkContext)
  if (!sdk) throw new Error("No SDK found");

  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await sdk.UserService.getUserInfo();
      setUser(user)
    }
    getUserInfo();
  }, [])

  return <CommonApp AppRouter={ZMPRouter}>{props.children}</CommonApp>
}

const ZMApp = () => {
  return <RecoilRoot>
    <SdkProvider sdk={ZaloSdk}>
      <BaseApp>
        {/* implement router here */}
      </BaseApp>
    </SdkProvider>
  </RecoilRoot>
}

export default ZMApp;
