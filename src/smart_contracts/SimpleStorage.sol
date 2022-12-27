//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.4;

contract Storage{

    //value storing
    string public storedData;

    event myEventTest(string eventOutput);

    function set(string memory _myText) public{
        storedData = _myText;
        emit myEventTest(_myText);
    }

    function get() public view returns(string memory){
        return storedData;
    }
}