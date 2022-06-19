package bank.model;



import bank.validator.CardNo;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Data
public class CreditCard {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @CardNo
    @NotEmpty(message = "Please provide a card number.")
    //@Pattern(regexp="[\\d]{19}", message = "Card no. should be numeric and upto 19 characters")
    private String card_no;

    @NotEmpty(message = "Please provide a name.")
    private String card_holder_name;

    private  BigDecimal balance;

    @NotNull(message = "Please provide a credit limit.")
    @DecimalMin("1.00")
    private BigDecimal credit_limit;

}
