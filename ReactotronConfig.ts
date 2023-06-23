import Reactotron from "reactotron-react-native";
import { NativeModules } from "react-native";

let packagerHostname = "localhost";
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  packagerHostname = scriptURL.split("://")[1].split(":")[0];
}

const reactotron = Reactotron.configure({
  name: "CloudFactoryTest",
  host: packagerHostname,
})
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1|logs/, // ignore expo logs
    },
    overlay: false,
  })
  .connect();

// reactotron.clear();

export default reactotron;
