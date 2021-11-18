import logo from "./logo.svg";
import "./App.css";
import React,{ Component } from "react";
import web3 from './web3';
import lottery from "./lottery";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { manager: '' }; //the default of {this.state.manager} is an empty string 
  // }

  //this statement is 100% equivalent to the above statement
  //initialize the state
  state = { 
    manager: '' ,
    players: [] , 
    balance: '' , 
    value: '' ,
    message: ''
  };

  async componentDidMount(){
    //make a call to the network to retrieve the current state of the lottery contract
    const manager = await lottery.methods.manager().call(); //manager's address
    const players = await lottery.methods.getPlayers().call(); 
    const balance = await web3.eth.getBalance(lottery.options.address);
  
    this.setState({ manager, players , balance }); //rerender the component 
  }

  //reactjs way of difining a function withput having to worry about binding onSubmit in the render function
  //the valur of this will be automatically set for us to be equal to our component, which is exactly what we want
  onSubmit = async (event) => {
    
    event.preventDefault();    

    //send a transaction to the enter function --> also use Async cus this will involve asynchronous code
    const accounts = await web3.eth.getAccounts(); //get lists of accounts (arrays)
    this.setState({ message: 'Waiting on transaction success...' });
    //enter players into the game
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
      //convert  this.state.value to wei from ether unit
    });

    this.setState({ message: 'You have been entered!'});
  };

  onClick = async() => {
    //similarly to onSubmit function
    // step1: get accounts
    // step2: tell user that we bout to do something
    // step3: send transaction to the network
    // step4: tell the user that the user have been picked
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });

  };

  render() {
      //web3.eth.getAccounts().then(console.log);
        
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}
        There are currently {this.state.players.length} people entered
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether ! 
        </p>

        <hr />

        <form onSubmit={this.onSubmit}> 
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of Ether to enter</label>
            <input
            value = { this.state.value }
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick} > Pick a winner! </button>
        <hr />

       <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
