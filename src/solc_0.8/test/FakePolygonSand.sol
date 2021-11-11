//SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "../common/BaseWithStorage/ERC20/ERC20BaseToken.sol";

contract FakePolygonSand is ERC20BaseToken {
    constructor() ERC20BaseToken("FakePolygonSand", "FPS", msg.sender, msg.sender) {
        _mint(msg.sender, 3000000000 * 10**18);
    }
}
