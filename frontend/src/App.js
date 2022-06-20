import './App.css';
import {Component} from "react";
import {CreditCardAdd} from "./components/CreditCardAdd";
import {CreditCardList} from "./components/CreditCardList";


class App extends Component{

    render() {

        return (
            <div className="container pt-3">
                <h1 className = "text-lg-start">Credit Card System</h1>
                <CreditCardAdd onAddingNewCard = {this.onAddingNewCard}/>
                <CreditCardList />
            </div>
        );
    }
}

export default App;
