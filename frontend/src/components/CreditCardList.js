import {Component,useState} from "react";


const baseUrl= "http://localhost:8080";

export class CreditCardList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            creditCards: []
        };
    }

    async componentDidMount() {
        const response = await fetch(baseUrl + '/creditCard', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        });
        const body = await response.json();
        this.setState({creditCards: body});
    }

    onAddingNewCard = () => {
        this.componentDidMount()
    }

    render() {
        const { creditCards } = this.state;
        return (
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
                                <tr key = {creditCard.id}>
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

        );
    }
}
