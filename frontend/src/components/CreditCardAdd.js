import {Component} from "react";

export class CreditCardAdd extends Component {

    emptyItem = {
        card_holder_name: '',
        card_no: '',
        credit_limit: '',
        isError: {
            card_holder_name: '',
            card_no: '',
            credit_limit: ''
        }
    };


    formValid = ({isError, ...rest}) => {
        let isValid = false;
        Object.values(isError).forEach(val => {
            if (val.length > 0) {
                isValid = false
            } else {
                isValid = true
            }
        });
        Object.values(rest).forEach(val => {
            if (val.length === 0) {
                isValid = false
            } else {
                isValid = true
            }
        });
        return isValid;
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    regExp = RegExp(
        /^\d+$/
    )


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let isError = {...this.state.item.isError};
        switch (name) {
            case "card_holder_name":
                isError.card_holder_name =
                    value.length === 0 ? "Name is required" : "";
                break;
            case "card_no":
                isError.card_no = this.regExp.test(value) && value.length < 20
                    ? ""
                    : "Card number is required and should not be more than 19 digits.";
                break;
            case "credit_limit":
                isError.credit_limit =
                    value.length === 0 ? "Credit limit is required" : "";
                break;
            default:
                break;
        }
        let item = {...this.state.item};
        item.isError = isError
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.formValid(this.state.item)) {
            console.log(this.state)

            const {item} = this.state;
            console.log("hi" + JSON.stringify(item))
            await fetch('http://localhost:8080/creditCard', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            }).then(response => response.json())
                .then(data => {
                    if (data.errors) {
                        alert(data.errors)
                    } else {
                        this.setState({item: this.emptyItem})
                        this.props.onAddingNewCard()
                    }

                });
        } else {
            alert("Form is invalid!");
        }
    }


    render() {

        const {isError} = this.state.item;
        return (
            <div className="container pt-5">
                <h2>Add</h2>

                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className={isError.card_holder_name.length > 0 ? "is-invalid form-control" : "form-control"}
                            name="card_holder_name"
                            onChange={this.handleChange}
                        />
                        {isError.card_holder_name.length > 0 && (
                            <span className="invalid-feedback">{isError.card_holder_name}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            className={isError.card_no.length > 0 ? "is-invalid form-control" : "form-control"}
                            name="card_no"
                            onChange={this.handleChange}
                        />
                        {isError.card_no.length > 0 && (
                            <span className="invalid-feedback">{isError.card_no}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Limit</label>
                        <input
                            type="number"
                            className={isError.credit_limit.length > 0 ? "is-invalid form-control" : "form-control"}
                            name="credit_limit"
                            onChange={this.handleChange}
                        />
                        {isError.credit_limit.length > 0 && (
                            <span className="invalid-feedback">{isError.credit_limit}</span>
                        )}
                    </div>
                    <input className="btn btn-secondary" type="submit"/>
                </form>
            </div>
        );
    }


}
