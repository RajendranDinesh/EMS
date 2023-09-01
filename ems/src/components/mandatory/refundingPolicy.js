import styled,{createGlobalStyle} from 'styled-components'

const  GlobalStyle = createGlobalStyle`
body {
    display:flex;
    font-family:monospace;
    background-color: #000000;
  }`;


  const MainContainer = styled.div`
  display:flex;
  flex-direction:column;
  background-color:black;
  color:white;
  justify-content:center;
  align-items: center;
  `;


    const Headertext = styled.div`
    font-size:20px;
    `;

    const List =styled.div`
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        `;
    const H1= styled.h1`
    font-size:30px;`


const Refund = () =>{
    return(

        <MainContainer>
            <GlobalStyle/>
        <Headertext>
            <h1>Refund Policy</h1>
        </Headertext>
        <List>
            <ul>
                <li>
                    <p><b>Cancellation by Participant:</b></p>
                    Participants who wish to cancel their registration for an event must do so by accessing their Haxguz Event Management App account. Refunds will be issued according to the following schedule:<br/>

                    Cancellation within 7 days of registration: Full refund.<br/>  
                    Cancellation more than 7 days before the event: 50% refund.<br/>
                    Cancellation within 7 days of the event: No refund.
                </li>
                <li>
                    <p><b>Cancellation by Haxguz:</b></p>In the rare event that Haxguz needs to cancel or reschedule an event, participants will be notified via email and within the app. If an event is canceled, participants will receive a full refund of the registration fee.
                </li>
                <li>
                    <p><b>Refund Processing:</b></p>Refunds will be processed within 15 business days of receiving the cancellation request. The refund will be credited to the original payment method used during registration.
                </li>
                <li>
                    <p><b>Event No-Show:</b></p>Participants who do not attend the event without prior cancellation will not be eligible for a refund.
                </li>
                <li>
                    <p><b>Additional Refund Considerations:</b></p>
                                Refund requests must be submitted no later than 24 hours after the event's original start time.<br/>  
                                Refund requests for events with a duration of less than 24 hours will not be considered after the event has concluded.
                </li>
                <b><H1>Payment Cancellation Policy:</H1></b>
                <li>
                    <p><b>Cancellation of Payment by Participant:</b></p>If a participant wishes to cancel a payment made through the Haxguz Event Management App, they must submit a request through the app's support or help center. Refunds for canceled payments will be subject to the refund policy mentioned above.
                </li>
                <li>
                    <p><b>Payment Disputes and Chargebacks:</b></p>Participants are encouraged to reach out to Haxguz support before initiating any payment disputes or chargebacks with their financial institution. Chargebacks initiated without prior communication may result in suspension or termination of the participant's account.
                </li>
                <li>
                    <p><b>Failed Payments:</b></p>In the case of a failed payment transaction, participants will have the opportunity to resolve the payment issue within a specified timeframe. If the payment issue is not resolved within the specified timeframe, the participant's registration may be canceled as per the refund policy.
                </li>
                <li>
                    <p><b>Payment Processing:</b></p>Haxguz uses secure third-party payment processors to handle transactions. Participants' payment information is encrypted and not stored on Haxguz servers.
                </li>
                <li>
                    <p><b>Payment Currency and Exchange Rates:</b></p>Participants making payments in a currency other than the default currency may incur additional charges due to exchange rate differences. Haxguz is not responsible for such charges.
                </li>
                <li>
                    <p><b>Payment Collection:</b></p>Participants agree that Haxguz may use authorized third parties to process payments and manage payment collections.
                </li>
                <li>
                    <p><b>Policy Updates:</b></p>Haxguz reserves the right to modify these refund and payment cancellation terms and conditions at any time. Participants will be notified of any changes through the app or via email.
                </li><li>
                    <p><b>Acceptance of Terms:</b></p>By using the Haxguz Event Management App and making payments, participants agree to abide by these refund and payment cancellation terms and conditions
                </li>
            </ul>
        </List>
        </MainContainer>
    );

};
export default Refund;