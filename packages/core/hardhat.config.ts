import '@nomiclabs/hardhat-ethers'; // aliased to hardhat-deploy-ethers
import '@nomiclabs/hardhat-etherscan';
import 'dotenv/config';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import {HardhatUserConfig} from 'hardhat/types';
import 'solidity-coverage';
import {accounts, node_url} from './utils/network';

const config: HardhatUserConfig = {
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  mocha: {
    timeout: 0,
    ...(!process.env.CI ? {} : {invert: true, grep: '@skip-on-ci'}),
  },
  solidity: {
    compilers: [
      {
        version: '0.8.15',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.7.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.6.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.5.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
    overrides: {
      'src/solc_0.8/polygon/child/asset/PolygonAssetV2.sol': {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
      'src/solc_0.8/asset/AssetV2.sol': {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      'src/solc_0.8/polygon/child/asset/PolygonAssetERC1155.sol:PolygonAssetERC1155': {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
      'src/solc_0.8/assetERC1155/AssetERC1155.sol:AssetERC1155': {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 1,
      goerli: '0xA8914C79456eD6d36102A1bed4E471dA2Af4d8d6',
      mumbai: '0xA8914C79456eD6d36102A1bed4E471dA2Af4d8d6',
    }, // deploy contracts and make sure they are set up correctly

    sandAdmin: {
      default: 2,
      mumbai: '0x9197A1CCdC89891b7533152053E9F503D7D4Bb2A',
      goerli: '0x9197A1CCdC89891b7533152053E9F503D7D4Bb2A',
    }, // can add super operators and change admin

    operationsAdmin: {
      default: 2,
      mumbai: '0x9197A1CCdC89891b7533152053E9F503D7D4Bb2A',
      goerli: '0x9197A1CCdC89891b7533152053E9F503D7D4Bb2A',
    },

    upgradeAdmin: 'sandAdmin',

    multiGiveawayAdmin: {
      default: 'sandAdmin',
    },

    liquidityRewardProvider: {
      default: 'sandBeneficiary',
    },
    liquidityRewardAdmin: 'sandAdmin',

    kyberDepositor: {
      default: 'sandBeneficiary',
    },

    sandExecutionAdmin: 'sandAdmin', // can add execution extension to SAND (used for Native metatx support)
    mintingFeeCollector: 'sandAdmin', // will receiver the fee from Asset minting
    sandBeneficiary: 'sandAdmin', // will be the owner of all initial SAND
    assetAdmin: 'sandAdmin', // can add super operator and change admin to Asset
    assetMinterAdmin: 'sandAdmin', // can set metaTxProcessors & types
    assetBouncerAdmin: 'sandAdmin', // setup the contract allowed to mint Assets
    sandSaleAdmin: 'sandAdmin', // can pause the sandSale and withdraw SAND
    genesisBouncerAdmin: 'sandAdmin', // can set who is allowed to mint
    defaultMinterAdmin: 'sandAdmin', // can change the fees
    genesisMinter: 'sandAdmin', // the first account allowed to mint genesis Assets
    assetAuctionFeeCollector: 'sandSaleBeneficiary', // collect fees from asset auctions
    assetAuctionAdmin: 'sandAdmin', // can change fee collector

    sandSaleBeneficiary: {
      default: 3,
      goerli: '0xdCD12C5539Ff0f31A2D163aFb6dde4c4acc7e9b4',
      mumbai: '0xdCD12C5539Ff0f31A2D163aFb6dde4c4acc7e9b4',
    },

    treasury: {
      default: 'sandSaleBeneficiary',
    },

    landSaleBeneficiary: {
      default: 'sandSaleBeneficiary',
    }, // updated to company treasury wallet 9th September - collect funds from land sales

    catalystAssetFeeRecipient: 'treasury',

    landSaleFeeRecipient: {
      default: 3,
      goerli: 5,
      mumbai: 5,
    }, // collect 5% fee from land sales (prior to implementation of FeeDistributor)

    landAdmin: {
      default: 2,
      goerli: '0x29f9d1a05F5F8a0e298ed76F2d98875ea6c6382a',
      mumbai: '0x29f9d1a05F5F8a0e298ed76F2d98875ea6c6382a',
    }, // can add super operators and change admin

    gemsAndCatalystsAdmin: 'sandAdmin',
    assetAttributesRegistryAdmin: 'sandAdmin',
    proxyAdminOwner: {
      default: 2,
      goerli: '0x1eBAaabCa67443167f82b02aeC5D8c0c060F292C',
      mumbai: '0x1eBAaabCa67443167f82b02aeC5D8c0c060F292C',
    },

    landSaleAdmin: 'sandAdmin', // can enable currencies
    gameTokenAdmin: 'sandAdmin', // can set minter address
    gameTokenFeeBeneficiary: 'treasury', // receives fees from GAME token  minting / Mods
    estateAdmin: 'sandAdmin', // can add super operators and change admin
    P2PERC721SaleAdmin: 'sandAdmin', // can set fees
    backendReferralWallet: {
      // default is computed from private key:
      // "0x4242424242424242424242424242424242424242424242424242424242424242"
      default: '0x809812E8707e0e34a69a6db6e08f79116c8D0e41',
    },
    // To be used with AuthValidator only
    backendAuthWallet: {
      default: '0x3cD06D6282cf7A79D03eAf3316ECfBee770A640b',
    },
    backendCashbackWallet: {
      default: '0x3cD06D6282cf7A79D03eAf3316ECfBee770A640b',
    },
    raffleSignWallet: {
      // default is computed from private key:
      // "0x4242424242424242424242424242424242424242424242424242424242424242"
      default: '0x3cD06D6282cf7A79D03eAf3316ECfBee770A640b',
    },
    sandboxAccount: {
      default: '0xb5F685cBF71526584cC78bC01a14C72767AbC646',
    },
    sandboxFoundation: {
      default: 'sandAdmin',
    },
    extraCatalystAndGemMinter: {
      default: '0x81Bba87de642Ac2D02F3CA1Db7a05e86e8ab2eDB',
    },
    defaultOperatorFiltererRegistry:
      '0x000000000000AAeB6D7670E522A718067333cd4E',
    defaultOperatorFiltererSubscription:
      '0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6',
    collectionCatalystMigrationsAdmin: 'sandAdmin', // TODO use special account or deployer ?
    catalystMinter: 'sandAdmin', // account that can mint catalysts
    catalystAdmin: 'sandAdmin', // can set minter and admin for catatalyt, as well as super operators
    gemAdmin: 'sandAdmin', // can set minter and admin for gems, as well as super operators
    gemMinter: 'sandAdmin', // account that can mint gems
    catalystRegistryAdmin: 'sandAdmin', // can change the minter
    catalystMinterAdmin: 'sandAdmin', // control the fees and which catalyst are allowed
    starterPackAdmin: 'sandAdmin', // can change price
    starterPackSaleBeneficiary: 'treasury', // collect funds from starter pack sales
    backendMessageSigner: 'backendReferralWallet', // account that sign message for the starter pack
    kyberLiquidityProvider: 'sandBeneficiary', //TODO check what should be the value
    gemsCatalystsRegistryAdmin: 'sandAdmin',
    ozdRelayer: {
      default: 1,
      mainnet: '0x0073e6eb087019bdb7bede02d23aeb068b74af99',
      polygon: '0x7051cb544c4a8d5aad1be46cc9524e48108e60b4',
      goerli: '0x4751d4dc3d8cff421598592b51bb1d9a0fb116e9',
      mumbai: '0x3c17c97f29182aec3d16a080cda94d6f773bbd91',
    },
    landMigrationBatchExecutor: 'ozdRelayer',
    nftCollectionAdmin: {
      default: 'sandAdmin',
      mainnet: null,
      polygon: '0x81Bba87de642Ac2D02F3CA1Db7a05e86e8ab2eDB',
    },
  },
  networks: {
    /**
     * TAGS:
     *  - mainnet -> production networks
     *  - testnet -> non production networks
     *  - L1      -> Layer 1 networks
     *  - L2      -> Layer 2 networks
     */
    hardhat: {
      accounts: accounts(process.env.HARDHAT_FORK),
      tags: ['testnet', 'L1', 'L2'],
      forking: process.env.HARDHAT_FORK
        ? {
            url: node_url(process.env.HARDHAT_FORK),
            blockNumber: process.env.HARDHAT_FORK_NUMBER
              ? parseInt(process.env.HARDHAT_FORK_NUMBER)
              : undefined,
          }
        : undefined,
      deploy: ['deploy_polygon', 'deploy'],
      // deploy: ['deploy-for-test', 'deploy'],
      companionNetworks: {
        l1: 'hardhat',
        l2: 'hardhat',
      },
      blockGasLimit:
        parseInt(process.env.HARDHAT_BLOCK_GAS_LIMIT || '0') || 30000000,
    },
    localhost: {
      url: 'http://localhost:8545',
      accounts: accounts(),
      tags: ['testnet', 'L1', 'L2'],
      deploy: ['deploy_polygon', 'deploy'],
      companionNetworks: {
        l1: 'localhost',
        l2: 'localhost',
      },
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
      tags: ['testnet', 'L1'],
      deploy: ['deploy'],
      // gasPrice: 600000000000, // Uncomment in case of pending txs, and adjust gas
      companionNetworks: {
        l2: 'mumbai',
      },
    },
    goerli_test: {
      url: node_url('goerli'),
      accounts: accounts('goerli_test'),
      tags: ['testnet', 'L1'],
      deploy: ['deploy'],
      // gasPrice: 600000000000, // Uncomment in case of pending txs, and adjust gas
      companionNetworks: {
        l2: 'mumbai_test',
      },
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
      tags: ['mainnet', 'L1'],
      companionNetworks: {
        l2: 'polygon',
      },
    },
    mumbai: {
      url: node_url('mumbai'),
      accounts: accounts('mumbai'),
      tags: ['testnet', 'L2'],
      deploy: ['deploy_polygon'],
      //gasPrice: 600000000000, // TODO: this fixes invalid sender issue
      companionNetworks: {
        l1: 'goerli',
      },
    },
    mumbai_test: {
      url: node_url('mumbai'),
      accounts: accounts('mumbai_test'),
      tags: ['testnet', 'L2'],
      deploy: ['deploy_polygon'],
      //gasPrice: 600000000000, // TODO: this fixes invalid sender issue
      companionNetworks: {
        l1: 'goerli_test',
      },
    },
    polygon: {
      url: node_url('polygon'),
      accounts: accounts('polygon'),
      tags: ['mainnet', 'L2'],
      deploy: ['deploy_polygon'],
      // gasPrice: 200000000000, // TODO: this fixes invalid sender issue
      companionNetworks: {
        l1: 'mainnet',
      },
    },
  },
  paths: {
    sources: 'src',
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false,
  },

  external: process.env.HARDHAT_FORK
    ? {
        deployments: {
          hardhat: ['deployments/' + process.env.HARDHAT_FORK],
        },
      }
    : undefined,
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY_MAINNET || '',
      goerli: process.env.ETHERSCAN_API_KEY_GOERLI || '',
      polygon: process.env.ETHERSCAN_API_KEY_POLYGON || '',
      polygonMumbai: process.env.ETHERSCAN_API_KEY_MUMBAI || '',
    },
  },
};

export default config;
