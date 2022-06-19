package bank.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = CardNoValidator.class)
@Documented
public @interface CardNo {

    String message() default "Card number is not valid.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
