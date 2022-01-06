pragma solidity ^0.4.26;

contract shivucoin_ico{
    
    // Max supply of Shivu Coins
    uint public max_shivucoins = 1000000;

    //USD -> Shivu Coins
    uint public usd_2_shivucoins = 1000;

    //Coins bought by Investors
    uint public toal_shivucoins_bought = 0;

    mapping(address => uint) equity_shivucoins;
    mapping(address => uint) equity_usd;

    //Checking if investors can buy Shivu Coins
    modifier can_buy_shivucoins(uint usd_invested){
        require(usd_invested * usd_2_shivucoins + toal_shivucoins_bought <= max_shivucoins);
        _;
    }

    function equity_in_shivucoins(address investor) external constant returns (uint) {
        return equity_shivucoins[investor];
    }

    function equity_in_usd(address investor) external constant returns (uint) {
        return equity_usd[investor]; 
    }

    //Buy Shivu Coins
    function buy_shivucoins(address investor, uint usd_invested) external 
    can_buy_shivucoins(usd_invested) {
        uint shivucoins_bought = usd_invested * usd_2_shivucoins;
        equity_shivucoins[investor] += shivucoins_bought;
        equity_usd[investor] = equity_shivucoins[investor] / 1000;
        toal_shivucoins_bought += shivucoins_bought;
    }

    function sell_shivucoins(address investor, uint shivucoins_sold) external {
        equity_shivucoins[investor] -= shivucoins_sold;
        equity_usd[investor] = equity_shivucoins[investor] / 1000;
        toal_shivucoins_bought -= shivucoins_sold;
    }
}