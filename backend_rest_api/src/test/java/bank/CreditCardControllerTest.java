package bank;


import bank.controller.CreditCardController;
import bank.model.CreditCard;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static java.util.Collections.singletonList;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.Is.is;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@WebMvcTest(CreditCardController.class)
public class CreditCardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CreditCardController creditCardController;

    @Autowired
    private ObjectMapper mapper;

    @Test
    public void getCreditCards() throws Exception {
        CreditCard creditCard = new CreditCard();
        creditCard.setCard_holder_name("Test");

        List<CreditCard> creditCards = singletonList(creditCard);

        Mockito.when(creditCardController.getCreditCards()).thenReturn(creditCards);

        mockMvc.perform(get("/creditCard")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].card_holder_name", is(creditCard.getCard_holder_name())));
    }


    @Test
    public void createCreditCard() throws Exception {
        CreditCard creditCard = new CreditCard();
        creditCard.setCard_holder_name("Test");
        creditCard.setCard_no("5555555555554444");
        creditCard.setCredit_limit(BigDecimal.valueOf(1000));

        Mockito.when(creditCardController.createCreditCard(creditCard)).thenReturn(creditCard);
        mockMvc.perform(post("/creditCard")
                            .contentType(APPLICATION_JSON)
                             .content(this.mapper.writeValueAsString(creditCard)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("card_holder_name", is(creditCard.getCard_holder_name())));
    }

    @Test
    public void createCreditCard_luhnCheckFail() throws Exception {
        CreditCard creditCard = new CreditCard();
        creditCard.setCard_holder_name("Test");
        creditCard.setCard_no("555555555555444");
        creditCard.setCredit_limit(BigDecimal.valueOf(1000));

        Mockito.when(creditCardController.createCreditCard(creditCard)).thenReturn(creditCard);
        mockMvc.perform(post("/creditCard")
                        .contentType(APPLICATION_JSON)
                        .content(this.mapper.writeValueAsString(creditCard)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp", is(notNullValue())))
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(1)))
                .andExpect(jsonPath("$.errors", hasItem("Card number is not valid.")));

    }

}
