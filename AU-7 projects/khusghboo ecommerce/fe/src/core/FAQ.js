import React from "react";
import Base from "./Base";
import "../sign.css";

function FAQ() {
  return (
    <Base>
      <div className="container mt-5" style={{ minHeight: "350px" }}>
        <h3 className="bg-dark text-white text-center">FAQ</h3>
        <section class="faq-section">
          <input type="checkbox" id="q1" />
          <label for="q1">How do I cancel the order, I have placed?</label>

          <p></p>
          <p>
            Order can be canceled till the same is out for delivery. Note: This
            may not be applicable for certain logistics partner. You would see
            an option to cancel within 'My Orders' section under the main menu
            of your App/Website/M-site then select the item or order you want to
            cancel. In case you are unable to cancel the order from'My Orders'
            section, you can refuse it at the time of delivery and refund will
            be processed into the source account, if order amount was paid
            online.
          </p>
        </section>
        <section class="faq-section">
          <input type="checkbox" id="q1" />
          <label for="q1">How can I get my order delivered faster?</label>

          <p></p>
          <p>
            Sorry, currently we do not have any service available to expedite
            the order delivery. In future, if we are offering such service and
            your area pincode is serviceable, you will receive a communication
            from our end.
          </p>
        </section>
        <section class="faq-section">
          <input type="checkbox" id="q1" />
          <label for="q1">How do I place an exchange request on Buyout?</label>

          <p></p>
          <p>
            Hand over the original product to our delivery staff and receive the
            exchange item from him. Please ensure that you have the original
            item available with you at the same address which has been selected
            for delivery of the exchange item
          </p>
        </section>
        <section class="faq-section">
          <input type="checkbox" id="q1" />
          <label for="q1">
            Why is sum total of EMI’s more than the order value?
          </label>

          <p></p>
          <p>
            The issuing bank charges interest per EMI transaction. The interest
            rates are decided by the bank and are displayed at the time of
            completing the transaction. There is no processing or convenience
            fees charged on any EMI transactions
          </p>
        </section>
        <section class="faq-section">
          <input type="checkbox" id="q1" />
          <label for="q1">How can I Self-Ship the product to Buyout?</label>

          <p></p>
          <p>
            If your area pin code is not serviceable for pickup, you will need
            to self-ship the return item via any reliable courier partner.
            Please ensure to place a sheet of paper with the details of Order ID
            and Return ID for each item included in the package. For all
            self-shipped returns, you will be duly reimbursed the shipping
            costs. Therefore, please ensure that scan copy of courier
            bill/receipt is shared via Contact us option available on
            App/Website/M-site. The courier bill/receipt should satisfy the
            following conditions for successful processing:
          </p>
        </section>
        <section class="faq-section">
          <input type="checkbox" id="q1" />
          <label for="q1">Why is my account locked?</label>

          <p></p>
          <p>
            Buyout locks accounts for a specified time period or permanently in
            case there are too many failed login attempts to your account. This
            is for the security of your account. You should be able to gain
            access back to your account by resetting your password or call
            customer care for further help.
          </p>
        </section>
        <section class="faq-section">
          <input type="checkbox" id="q1" />
          <label for="q1">
            I do not have my old mobile number? How can I log into my account
            and change mobile number?
          </label>

          <p></p>
          <p>
            You can update your account details by going to Account Recovery.
            For that, you will need to enter your old mobile number and go to
            the OTP page. You will find an option "Get Help" there to recover
            your account
          </p>
        </section>
      </div>
    </Base>
  );
}

export default FAQ;
