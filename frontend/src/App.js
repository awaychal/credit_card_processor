import './App.css';
import {Component} from "react";
import {CreditCardAdd} from "./components/CreditCardAdd";

export const baseUrl= "http://localhost:8080";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            creditCards: []
        };
    }

     getCreditCardList() {
        fetch(baseUrl + '/creditCard', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    this.setState({ creditCards: data })
                }
            });
    }

    componentDidMount() {
        this.getCreditCardList();
    }

    onAddingNewCard = () => {
        this.getCreditCardList();
    }

    render() {
        const {creditCards} = this.state;
        return (
            <div className="container pt-3">
                <h1 className = "text-lg-start">Credit Card System</h1>
                <CreditCardAdd func = {this.onAddingNewCard}/>

                <div className="container pt-5">
                    <h2 className = "text-lg-start"> Existing Cards</h2>
                    <table className="table table-bordered text-center" >
                        <thead className="table-secondary">
                        <tr>
                            <td> Name </td>
                            <td> Card Number</td>
                            <td> Balance </td>
                            <td> Limit</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            creditCards.map(
                                creditCard =>
                                    <tr key = {creditCard.card_no}>
                                        <td> {creditCard.card_holder_name}</td>
                                        <td> {creditCard.card_no}</td>
                                        <td> {creditCard.balance}</td>
                                        <td> {creditCard.credit_limit}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default App;
