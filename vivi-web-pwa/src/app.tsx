import { useContext, useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { AnimationRouter } from "common/router";
import CommonApp from 'common/app'
import SdkProvider, { SdkContext, SdkContextType } from 'common/contexts/sdk.context';
import { WebSdk } from "common/sdk";
import { userState } from "common/state";
  
const BaseApp = (props) => {
  // handle side effects
  const sdk = useContext<SdkContextType>(SdkContext)
  if (!sdk) throw new Error("No SDK found");

  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await sdk.UserService.getUserInfo();
      setUser(user.userInfo)
    }
    getUserInfo();
  }, [])

  return <CommonApp AppRouter={AnimationRouter}>{props.children}</CommonApp>
}

const WebPWA = () => {
  return <RecoilRoot>
    <SdkProvider sdk={WebSdk}>
      <BaseApp>
        {/* implement router here */}
      </BaseApp>
    </SdkProvider>
  </RecoilRoot>
}

export default WebPWA;
