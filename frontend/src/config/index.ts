let selectedBusinessStripeAccountId = "";

export const getSelectedBusinessStripeAccountId = (): string => {
  return selectedBusinessStripeAccountId;
};

export const setSelectedBusinessStripeAccountId = (
  pSelectedBusinessStripeAccountId: string,
) => {
  selectedBusinessStripeAccountId = pSelectedBusinessStripeAccountId;
};

export const TEST_SITE_KEY = "6Lf8Lq8ZAAAAAMcvLBPMfV-AFImJM12-JJluZskI";

export const appConfig = {
  networkId: 1,
  onboardId: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
  ethereumNodeEndpoint:
    "https://mainnet.infura.io/v3/55b4d27b09d64c4c8a6d9e381a51455d",
  contractRegistryAddress: "0x52Ae12ABe5D8BD778BD5397F99cA900624CfADD4",
};
