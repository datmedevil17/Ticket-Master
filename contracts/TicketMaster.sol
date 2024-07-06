// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketMaster is ERC721{
    address public owner;
    uint256 public totalOccasions; 
    uint256 public totalSupply;
    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }
    mapping(uint256=>Occasion) occasions;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken; //occasion me konsi seat pe konsa address
    mapping(uint256 => mapping(address => bool)) public hasBought; //occasion me kisi address ne khredi ki nhi
    mapping(uint256 => uint256[]) seatsTaken;
    modifier  onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor() ERC721( "Token", "Ticket"){
        owner = msg.sender;
    }
    function list(string memory _name, uint256 _cost, uint256 _maxTickets, string memory _date, string memory _time, string memory _location)
    public onlyOwner{
        
        totalOccasions++;
       Occasion memory newOccasion = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
            ); 
            occasions[totalOccasions] = newOccasion;

    }
    function mint(uint256 _id, uint256 _seat) public payable{
        require(_id != 0);
        require(_id <= totalOccasions);
        require(msg.value >= occasions[_id].cost);//Eth sent is greater than cost
        require(seatTaken[_id][_seat]==address(0));//seat is not taken and exsits
        require(_seat <= occasions[_id].maxTickets);

        totalSupply++;
        occasions[_id].tickets -=1;
        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender;
        seatsTaken[_id].push(_seat);

        _safeMint(msg.sender,totalSupply);
    }

    function getOccasion(uint256 _id)public view returns (Occasion memory){
        return occasions[_id];
    }
    function getSeatsTaken(uint256 _id) public view returns(uint256[] memory){
        return seatsTaken[_id];
    }
    function withdraw() public onlyOwner{
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    
// 0x5FbDB2315678afecb367f032d93F642f64180aa3


}