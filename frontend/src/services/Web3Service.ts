import Onboard from "bnc-onboard";
import { appConfig } from "../config";
import { IDX } from "@ceramicstudio/idx";

let account = null;
let provider = null;

const onboard = Onboard({
  dappId: appConfig.onboardId, // [String] The API key created by step one above
  networkId: appConfig.networkId, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      provider = wallet.provider;
    },
    address: (address) => {
      account = address;
    },
  },
});

export const login = async () => {
  await onboard.walletSelect();
  await onboard.walletCheck();
};

export const openIDXSpace = async () => {
  try {
    if (typeof provider !== "undefined") {
      const { ThreeIdConnect, EthereumAuthProvider } = await import("3id-connect");
      const threeID = new ThreeIdConnect(null);

      await threeID.connect(new EthereumAuthProvider(provider, account));
      const didProvider = threeID.getDidProvider();
      const Ceramic = (await import("@ceramicnetwork/http-client")).default;
      const ceramic = new Ceramic("https://ceramic-dev.3boxlabs.com");
      await ceramic.setDIDProvider(didProvider as any);
      const idx = createIDX(ceramic);
      // await idx.set("basicProfile", {
      //   first_name: "Manank",
      //   last_name: "Patni",
      //   email: "manank321@gmail.com",
      //   photoURL:
      //     "https://lh6.googleusercontent.com/-Mm-pQAfOvPw/AAAAAAAAAAI/AAAAAAAAAKo/AMZuucl50dhPbFez9dOwU1TOVenzVlOB_w/photo.jpg",
      //   emailVerified: "true",
      //   phoneNumber: "null",
      // });
      const user = await idx.get("basicProfile");
      user["idxId"] = idx.id;
      if (user) {
        return { user };
      }
      return null;
    }
    throw new Error("No web3 provider available");
  } catch (error) {
    throw error;
  }
};

export function createIDX(ceramic) {
  const idx = new IDX({ ceramic });
  return idx;
}
