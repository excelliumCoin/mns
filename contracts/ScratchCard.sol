// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ScratchCard {
    address public owner;
    uint256 public ticketPrice = 1 ether; // 1 MONAD
    uint256 public totalPool;

    event TicketBought(address indexed player, uint256 value);
    event PrizeClaimed(address indexed winner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Kullanıcı 1 MON ile kart alır, ödül akıllı kontrat dışında hesaplanır
    function buyTicket() external payable {
        require(msg.value == ticketPrice, "Exactly 1 MON required");
        totalPool += msg.value;
        emit TicketBought(msg.sender, msg.value);
    }

    // Eğer 3 eşleşme varsa, frontend bu fonksiyonu çağırarak ödemeyi alır
    function claimPrize(uint256 amount) external {
        require(amount <= totalPool, "Not enough funds in pool");
        totalPool -= amount;
        payable(msg.sender).transfer(amount);
        emit PrizeClaimed(msg.sender, amount);
    }

    // Sahip kalan ödül havuzunu çekebilir
    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        payable(owner).transfer(address(this).balance);
    }

    // Kontrat bakiyesi görüntüleme
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
