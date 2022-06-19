package bank.controller;


import bank.model.CreditCard;
import bank.service.CreditCardRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("creditCard")
public class CreditCardController {

    private final CreditCardRepository creditCardRepository;

    public CreditCardController(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    @GetMapping
    public List<CreditCard> getCreditCards(){;
        return creditCardRepository.findAll();
    }

    @PostMapping
    public CreditCard createCreditCard(@Valid @RequestBody CreditCard creditCard) {
        creditCard.setBalance(BigDecimal.valueOf(0));
        return creditCardRepository.save(creditCard);
    }
}
