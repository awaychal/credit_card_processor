package bank.model;


import bank.validator.CardNo;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Data
public class CreditCard {

    @Id
    @CardNo
    @NotEmpty(message = "Please provide a card number")
    private String card_no;

    @NotEmpty(message = "Please provide a name")
    private String card_holder_name;

    private BigDecimal balance;

    @NotNull(message = "Please provide a credit limit")
    private BigDecimal credit_limit;

}
