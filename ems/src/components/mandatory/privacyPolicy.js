import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    display:flex;
    font-family:monospace;
    background-color: #000000;
    align-items:center;
    justify-content: center;
  }
`;

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    background-color:black;
    color:white;
    justify-content:center;
    align-items: center;
    `;

const HeadText=styled.div`
    font-size:20px;
  `;

const List =styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
  `;
const Privacy=()=>{
    return(
        <MainContainer>
            <GlobalStyle/>
            <HeadText>
              <h1>Haxguz Info Portal: Privacy Policy</h1>
            </HeadText>
            <List>
              <ul>
                <li>
                  <p><b>Introduction</b></p>Welcome to the Haxguz Event Management App ("App"). This Privacy Policy ("Policy") explains how Haxguz ("we," "us," "our") collects, uses, shares, and protects your personal information when you use our App. By accessing or using the App, you consent to the practices described in this Policy.
                </li>
                <li>
                  <p><b>Information We Collect</b></p>

                    We collect the following types of information:<br/>

                    Personal Information: This includes your name, email address, phone number, billing and payment information, and other data you provide when registering for events, creating an account, or using our services.<br/>

                    Usage Information: We collect information about how you interact with the App, such as your device information, IP address, browser type, operating system, and app activity.<br/>

                    Event Information: We may collect event-related data such as event preferences, registrations, ticket purchases, and interactions with event content.<br/>

                    Location Information: We may collect your general location data based on your IP address or more precise location data if you grant us permission through your device settings.
                </li>
                <li>
                  <p><b>How We Use Your Information</b></p>

                    We use the information we collect for various purposes, including:<br/>

                    Providing Services: To manage and facilitate events, send event notifications, and process ticket purchases.<br/>
                    Personalization: To tailor event recommendations, content, and communications based on your preferences and interactions.<br/>
                    Communication: To communicate with you about events, updates, promotions, and customer support inquiries.<br/>
                    Analytics: To analyze usage patterns, improve the App's functionality, and understand user behavior.
                </li>
                <li>
                  <p><b>Sharing Your Information</b></p>

                      We may share your information with the following parties:<br/>
                      Event Organizers: We share event-related information with organizers to facilitate event management and communication.<br/>
                      Service Providers: We engage third-party service providers to assist us in delivering services, such as payment processing, analytics, and customer support.<br/>
                      Legal Authorities: We may disclose information if required by law, to protect our rights, or in response to legal requests.
                </li>
                <li>
                  <p><b>Your Choices</b></p>

                    You have options to control your information:<br/>

                    Account Information: You can update your account details, communication preferences, and privacy settings within the App.<br/>
                    Communication Opt-Out: You can opt out of receiving promotional emails by clicking the "Unsubscribe" link or adjusting your email preferences.<br/>
                    Device Settings: You can control App permissions through your device settings.<br/>
                </li>
                <li>
                  <p><b>Security</b></p>We implement a range of security measures to protect your information. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.
                </li>
                <li>
                  <p><b> Children's Privacy</b></p>
                    The App is not intended for children under the age of 10. We do not knowingly collect personal information from children. If you believe a child has provided us with their information, please contact us to have it removed.
                </li>
                <li>
                  <p><b>International Transfers</b></p>Your information may be transferred to and processed in countries other than your own. By using the App, you consent to the transfer of your information to such countries.
                </li>
                <li>
                  <p><b>Changes to this Privacy Policy</b></p>We may update this Policy periodically. We will notify you of significant changes through the App or via email. Your continued use of the App after changes indicates your acceptance of the updated policy.
                </li>
                <li>
                  <p><b>Cookies and Similar Technologies</b></p>We use cookies and similar technologies to enhance your experience and gather usage data. These technologies help us understand how you interact with the App, personalize content, and analyze trends. You can manage your cookie preferences through your browser settings.
                </li>
                <li>
                  <p><b>Third-Party Links</b></p>The App may contain links to third-party websites, services, and social media platforms. This Policy does not cover the practices of these third parties. We recommend reviewing their privacy policies before interacting with their services.
                </li>
                <li>
                  <p><b>Social Media Integration</b></p>If you choose to connect your social media accounts to the App, we may collect and share information with those platforms in accordance with your settings. This may include sharing event activity or allowing you to share event information on your social media profiles.
                </li>
                <li>
                  <p><b> Marketing Communications</b></p>We may send you marketing communications about our services and events if you have provided your consent. You can opt out of these communications at any time by updating your communication preferences or using the provided unsubscribe option.
                </li>
                <li>
                  <p><b>Data Retention</b></p>We retain your information as long as necessary to provide our services and fulfill the purposes outlined in this Policy. If you request deletion of your account, we will securely dispose of your information unless legal obligations require us to retain it.
                </li>
                <li>
                  <p><b>Your Rights</b></p>
                    You have the right to:<br/>
                    Access and receive a copy of the personal information we hold about you.<br/>
                    Rectify inaccuracies in your information.<br/>
                    Withdraw your consent at any time, if processing is based on consent.<br/>
                    Request erasure of your information, subject to legal requirements.<br/>
                    Lodge complaints with relevant data protection authorities.<br/>
                </li>
                <li>
                  <p><b> Data Transfer and Processing</b></p>By using the App, you consent to the transfer and processing of your information in accordance with this Policy. Your information may be stored and processed in servers located in various countries.
                </li>
                <li>
                  <p><b>Changes to Ownership</b></p>In the event of a merger, acquisition, or sale of our assets, your information may be transferred to the new owner or entity. We will notify you of any changes to ownership and your options regarding your information.
                </li>
                <li>
                  <p><b>California Privacy Rights</b></p>Residents of California have additional rights under the California Consumer Privacy Act (CCPA). For more information about your rights and how to exercise them, please refer to our separate CCPA Privacy Notice.
                </li>
                <li>
                  <p><b>European Economic Area (EEA) Residents</b></p>If you are an EEA resident, you may have additional rights under the General Data Protection Regulation (GDPR). Please refer to our separate GDPR Privacy Notice for more details.
                </li>
              
              <li>
                <p><b>Governing Law</b></p>This Privacy Policy is governed by the laws of Jurisdiction. Any disputes arising from this Policy shall be subject to the exclusive jurisdiction of the courts in Jurisdiction.
              </li>
              <li>
                <p><b>Consent and Withdrawal</b></p>By using the App, you consent to the collection, processing, and sharing of your information as outlined in this Privacy Policy. You have the right to withdraw your consent at any time. Withdrawal of consent will not affect the lawfulness of processing based on consent before its withdrawal
              </li>
              <li>
                <p><b>Data Accuracy</b></p> We strive to ensure the accuracy of your information. You can update your account details at any time within the App. Please notify us of any inaccuracies, and we will rectify them promptly.
              </li>
              <li>
                <p><b>Data Protection Measures</b></p> We implement technical, organizational, and administrative measures to safeguard your information. These measures include encryption, access controls, regular security assessments, and employee training.
              </li>
              <li>
                <p><b>Minors' Privacy</b></p>Protecting the privacy of minors is important to us. We do not knowingly collect or process personal information from individuals under the age of 10. If you believe we have collected information from a minor, please contact us, and we will promptly address the situation.
              </li>
              <li>
                <p><b>User Generated Content</b></p> If you contribute content to the App, such as event reviews or comments, this content may be visible to other users. Please be cautious about sharing personal information in your contributions, as this information may become public.
              </li>
              <li>
                <p><b>Notification of Data Breaches</b></p>In the event of a data breach that poses a risk to your rights and freedoms, we will promptly notify you and relevant authorities as required by applicable laws.
              </li>
              <li>
                <p><b>Automated Decision-Making</b></p>We may use automated decision-making processes to enhance your experience and provide tailored content and recommendations. You have the right to request human intervention, express your point of view, and challenge automated decisions.
              </li>
              <li>
                <p><b>Changes to this Privacy Policy</b></p>We may revise this Privacy Policy to reflect changes in our data practices or legal requirements. We will post the updated Policy on our website and notify you of material changes via the App or email.
              </li>
              <li>
                <p><b>Effective Date</b></p>This Privacy Policy is effective as of 01.sep.2023 and replaces any previous policies. Your continued use of the App signifies your acceptance of this Policy.
              </li>
              <li>
                <p><b>Contact Information</b></p>
                  If you have any questions, concerns, requests, or complaints regarding this Privacy Policy or the processing of your information, please contact our Data Protection Officer at [DPO email] or write to:<br/>

                  [Haxguz]<br/>
                  [India]<br/>
                  [Coimbatore, TamilNadu, 636401]
              </li>
              </ul>
            </List>
        </MainContainer>
    );
};
export default Privacy;