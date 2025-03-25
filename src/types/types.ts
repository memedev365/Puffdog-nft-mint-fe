import { web3 } from "@project-serum/anchor";

export type activityTableDataType = {
  imgUrl: string;
  name: string;
  type: number;
  total: number;
  seller: string;
  buyer: string;
  time: number;
};

export type ListNFTItemType = {
  tokenId: string;
  listed: boolean;
  collectionName: string;
  collectionAddr: string;
  imgUrl: string;
  mintAddr: string;
  metaDataUrl: string;
  price: number;
  seller: string;
  minIncrease?: number;
  endTime?: number;
};

export type SelectPropsType = {
  options: any[];
  filterType: string;
  onSelectFilter: (e: any) => void;
};

export type MyNFTFilterSelectPropsType = {
  setSelectItem: () => void;
  options: any[];
  filterType: string;
};

export type HeaderProps = {
  title?: string;
};

export type BalanceProps = {
  myBalance?: number;
  address: web3.PublicKey | null;
};

export type NFTCardType = {
  imgUrl: string;
  tokenId: string;
  mintAddr: string;
  collectionName: string;
  solPrice: number;
  state: string;
  showGrid: string;
};

export type AuctionNFTCardType = {
  imgUrl: string;
  tokenId: string;
  mintAddr: string;
  collectionName: string;
  solPrice: number;
  state: string;
  endTime: number | undefined;
};

export type NFTAttribute = {
  trait_type: string;
  value: string;
};

export type OwnNFTDataType = {
  collectionName: string;
  tokenId: string;
  mintAddr: string;
  imgUrl: string;
  description: string;
  collectionAddr: string;
  seller: string;
  metaDataUrl: string;
  solPrice: number;
  listed: boolean;
  attribute: NFTAttribute[];
  updatedAt: string | number | Date;
  lastBidPrice?: number;
  minIncrease?: number;

  endTime?: number;
};

export type OfferDataType = {
  tokenId: string;
  imgUrl: string;
  mintAddr: string;
  offerPrice: number;
  collectionAddr: string;
  seller: string;
  buyer: string;
  active: number;
};

export type CollectionDataType = {
  imgUrl: string;
  collectionName: string;
  collectionAddr: string;
  twitterLink: string;
  discordLink: string;
  floorPrice: number;
  totalVolume: number;
  volume: number;
  topOffer: number;
  sales: number;
  listed: number;
  owners: number;
};

export type UserDataType = {
  userName: string;
  userAddr: string;
  email: string;
  userWallet: string;
};

export type ActivityDataType = {
  updatedAt: string | number | Date;
  imgUrl: string;
  tokenId: string;
  mintAddr: string;
  txType: number;
  solPrice: number;
  seller: string;
  buyer: string;
  date: string;
};

export type ActivityTableTHType = {
  name: string;
  type: number;
  Price: string;
  seller: string;
  buyer: string;
  time: string;
};
export type CollectionTableTHType = {
  collectionName: string;
  floorPrice: number;
  totalVolume: number;
  volume: number;
  sales: number;
  topOffer: number;
  listed: number;
  owners: number;
};

export interface NFTDataContextType {
  solPrice: number;
  myBalance: number;
  getOwnNFTsState: boolean;
  ownNFTs: OwnNFTDataType[];
  ownListedNFTs: OwnNFTDataType[];
  listedAllNFTs: OwnNFTDataType[];
  allAuctions: OwnNFTDataType[];
  getOwnNFTs: () => Promise<void>;
  getAllListedNFTs: () => Promise<void>;
  getAllListedNFTsBySeller: () => Promise<void>;
}

export interface CollectionContextType {
  collectionDataState: boolean;
  collectionData: CollectionDataType[];
  getAllCollectionData: () => Promise<void>;
}

export interface SidebarPropsType {
  filterOpen: boolean;
  onClosebar: () => void;
}

export interface RedeemModalProps {
  handleRedeemFunc: (email: string, homeAddr: string) => void;
}

export interface CollectionDetailProps {
  collectionData: CollectionDataType | undefined;
}

export interface ButtonProps {
  wallet: any;
  typeParam?: string;
  bidPrice?: number;
  selectedNFT: OwnNFTDataType | undefined;
  offerData?: OfferDataType[];
  handleUpdatePriceFunc?: () => void;
  handleMakeOffer?: () => void;
  handleCancelOffer?: (mintAddr: string) => Promise<void>;
  handleAcceptHighOffer?: () => void;
  handleListMyNFTFunc?: () => void;
  handleDelistMyNFTFunc?: () => void;
  handlePlaceBidFunc?: () => void;
  handleBuyNFTFunc?: () => void;
  handleCreateAuctionMyNFTFunc?: () => void;
  handleClaimAuctionNFTFunc?: () => void;
  handleCancelAuctionMyNFTFunc?: () => void;
}
