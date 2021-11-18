//Window or a portal that exist in a blockchain//

import web3 from './web3';
const address = '0x993794Ed3666f4429f226116Fc45c6727103c42C';
const abi = [
    {
        "constant":true,
        "inputs":[],
        "name":"manager",
        "outputs":[{"name":"",
        "type":"address"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[],
        "name":"pickWinner",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[],
        "name":"getPlayers",
        "outputs":[{"name":"",
        "type":"address[]"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"   
    },
    {
        "constant":false,
        "inputs":[],
        "name":"enter",
        "outputs":[],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[{"name":"",
        "type":"uint256"}],
        "name":"players",
        "outputs":[{"name":"",
        "type":"address"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    }
];

export default new web3.eth.Contract(abi,address);
//export a complete copy of our Contract that we can work with form the React side of our code based.
