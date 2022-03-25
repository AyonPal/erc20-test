// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20{
    constructor(uint256 totalSupply, string memory name, string memory symbol) ERC20(name, symbol){
        _mint(msg.sender, totalSupply);
    }
}