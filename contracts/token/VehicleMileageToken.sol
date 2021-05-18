// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../access/roles/WhitelistedRole.sol";
import "../math/SafeMath.sol";

contract VehicleMileageToken is WhitelistedRole {
    using SafeMath for uint256;

    string public name = "VehicleMileage";
    string public symbol = "KM";
    uint256 public decimals = 3;
    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value, uint timestamp);

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements
     *
     * - `to` cannot be the zero address.
     */

    function _mint(address account, uint256 amount) internal onlyWhitelisted {
        require(account != address(0), "ERC20: mint to the zero account");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(_msgSender(), account, amount, block.timestamp);
    }

}