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

const Page =styled.div`
    display:flex;
    flex-direction:column;
    background-color:black;
    color:white;
    justify-content:center;
    align-items: center;
    font-family:monospace;
    
`;

const HeadText= styled.div`
    display:flex;
    font-size:20px;
    `;

const List=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    `;

const Terms = () => {
  return (
    <Page>
      <GlobalStyle/>
      <HeadText>
        <h1>Haxguz Info Portal :Terms and Conditions</h1>
      </HeadText>
      <List>
        <ul>
          <li>
            <p><b>Acceptance of Terms:</b></p>
            <p>
            By downloading, installing, or using the Haxguz Event Management App, you acknowledge that you have read, understood, and agreed to comply with these terms and conditions. If you do not agree with these terms, please refrain from using the app.</p>
          </li>
          <li>
            <p><b>Use of the App:</b></p>
            The Haxguz Event Management App provides a platform to discover, manage, and participate in various events. You agree to use the app only for lawful purposes and in compliance with all applicable laws and regulations.
          </li>
          <li>
            <p><b>Privacy and Data Security:</b></p>
            We take your privacy seriously. Our Privacy Policy outlines how we collect, use, and protect your personal information. By using the app, you consent to the practices described in the Privacy Policy.
          </li>
          <li>
            <p><b>Intellectual Property:</b></p>
            All content and materials provided by the Haxguz Event Management App, including text, graphics, logos, and images, are the intellectual property of Haxguz or its licensors. You agree not to use, reproduce, or distribute these materials without our explicit permission.
          </li>
          <li>
            <p><b>User Responsibilities:</b></p>
            You are responsible for the accuracy of the information you provide while using the app. You must not engage in any unauthorized activities that could disrupt the app's functionality, compromise security, or violate the rights of others.
          </li>
          <li>
            <p><b>Payment and Transactions:</b></p>
              If the app facilitates transactions or ticket sales, you agree to provide accurate payment information. Haxguz is not responsible for any errors or discrepancies in transactions conducted through the app.
          </li>
          <li>
            <p><b>Disclaimers and Limitation of Liability:</b></p>
            The Haxguz Event Management App is provided on an "as-is" basis. We do not guarantee the accuracy, reliability, or availability of the app at all times. Haxguz shall not be liable for any damages arising from your use of the app.
          </li>
          <li>
            <p><b>Governing Law and Dispute Resolution:</b></p>
            These terms and conditions are governed by the laws of [Jurisdiction]. Any disputes arising from your use of the app shall be resolved through arbitration in accordance with the rules of [Arbitration Organization].
          </li>
          <li>
            <p><b>Modifications to Terms:</b></p>
            Haxguz reserves the right to modify, update, or revise these terms and conditions at any time. Changes will be effective upon posting on the app. It is your responsibility to review these terms periodically for updates.
          </li>
          <li>
            <p><b>User Content:</b></p> 
            When using the Haxguz Event Management App, you may have the opportunity to post, share, or submit content such as event descriptions, images, and comments. You retain ownership of your content, but by uploading it, you grant Haxguz a non-exclusive, royalty-free license to use, display, and distribute your content within the app and for promotional purposes.
          </li>
          <li>
            <p><b>Community Guidelines:</b></p>
            We encourage respectful and responsible interaction within the Haxguz community. You agree not to post or share content that is offensive, discriminatory, or violates the rights of others. Haxguz reserves the right to remove any content that violates our community guidelines and to suspend or terminate accounts of users who repeatedly infringe upon these guidelines.
          </li>
          <li>
            <p><b>Modification and Interruption:</b></p>
            Haxguz may modify, update, or discontinue the app's features, functionalities, or services at any time without prior notice. We aim to minimize interruptions, but we cannot guarantee uninterrupted access to the app due to maintenance, technical issues, or unforeseen events.
          </li>
          <li>
            <p><b>Indemnification:</b></p>
            You agree to indemnify and hold Haxguz and its affiliates, officers, and employees harmless from any claims, damages, liabilities, and expenses arising from your use of the app, violation of these terms, or infringement of any rights.
          </li>
          <li>
            <p><b>Severability:</b></p>
            If any provision of these terms is deemed invalid or unenforceable, the remaining provisions shall remain in full force and effect. The invalid provision will be replaced with a valid provision that reflects the intent of the original provision.
          </li>
          <li>
            <p><b>Entire Agreement:</b></p>
            These terms and conditions constitute the entire agreement between you and Haxguz regarding the use of the Event Management App, superseding any prior agreements, understandings, or representations.
          </li>
          <li>
            <p><b>Contact Information:</b></p>
            For questions, concerns, or feedback about these terms and conditions or the Haxguz Event Management App, you can contact our support team at [Haxguz@gmail.com] or [987643210].
          </li>
          <li>
            <p><b>User Account Security:</b></p>You are responsible for maintaining the confidentiality of your account credentials, including your username and password. You agree not to share your account information with others and to notify Haxguz immediately if you suspect any unauthorized use of your account.
          </li>
          <li>
            <p><b>User Feedback and Suggestions:</b></p>
            We value your feedback and suggestions for improving the Haxguz Event Management App. If you choose to provide feedback, you grant Haxguz the right to use and incorporate your ideas without any obligation to compensate you.
          </li>
          <li>
            <p><b>Age Restriction:</b></p> 
            The Haxguz Event Management App is intended for users who are 5 years old or older. By using the app, you represent that you meet this age requirement.
          </li>
          <li>
            <p><b> Accessibility and Accommodations:</b></p>
            Haxguz is committed to making its services accessible to all users. If you require specific accommodations or have accessibility concerns, please contact our support team to discuss how we can assist you
          </li>
          <li>
            <p><b>Geographic Limitations:</b></p>
            The availability of certain features or services offered by the Haxguz Event Management App may vary based on your location. You acknowledge that not all features may be accessible in all regions.
          </li>
          <li>
            <p><b>Changes to Terms:</b></p>
            Haxguz reserves the right to update or modify these terms and conditions at any time. We will notify you of significant changes through the app or via email. Your continued use of the app after the changes indicates your acceptance of the updated terms.
          </li>
          <li>
            <p><b>Language of Agreement:</b></p>
            In the event of any discrepancies between translations of these terms and conditions, the English version shall prevail.
          </li>
          <li>
            <p><b>Force Majeure:</b></p> 
            Haxguz shall not be liable for any failure to perform its obligations due to circumstances beyond its reasonable control, including but not limited to natural disasters, acts of terrorism, and government actions.
          </li>
          <li>
            <p><b>Waiver:</b></p>
            The failure of Haxguz to enforce any provision of these terms at any time does not constitute a waiver of its right to enforce such provision in the future.
          </li>
          <li>
            <p><b>Legal Compliance:</b></p> 
            You agree to use the Haxguz Event Management App in compliance with all applicable laws, regulations, and guidelines.
          </li>
          <li>
            <p><b>Updates and Notifications:</b></p> 
            Haxguz may send you updates, notifications, and promotional messages related to the app. You can manage your communication preferences within the app settings.
          </li>
          <li>
            <p><b>Survival:</b></p>
            Sections of these terms that by their nature should survive termination shall remain in effect even after the termination of your use of the app.
          </li>
          <li>
            <p><b>Termination:</b></p>
              Haxguz may suspend or terminate your access to the app if you violate these terms or engage in prohibited activities. You can also terminate your use of the app at any time.
              Thank you for using the Haxguz Event Management App! If you have any questions or concerns about these terms and conditions, please contact our support team at [contact email].
          </li>
        </ul>
      </List>
    </Page>
  );
}

export default Terms;
