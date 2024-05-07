import { SubTitle } from "@/app/components/title-components";

export const PolicyContent = () => {
  const policyText = `
Privacy statement for www.djship.co.kr/ 
DongJin Shipping has created this privacy statement in order to demonstrate our commitment to protect the privacy of our users. 

Personal Information 
The registration form used for accessing the DongJin Shipping website and its interactive shipping applications requires for users to give us contact details such as (name, address and communication details). This information is being used to send information and promotional material to registered users about our company and new applications to be launched on our website. 

The information or data registered via www.djship.co.kr/ are not made publicly available. 

www.djship.co.kr/ has security measures in place to protect the user information registered in our systems. These measures include restricted access to databases containing user information.

Except as set out below or as may be otherwise agreed, DongJin Shipping does not publish, share, trade, sell or otherwise disseminate any of the information or data registered or provided to us to any other party. DongJin Shipping may, however, be obligated and are entitled to disclose information and data registered or provided to us in compliance with applicable law, court or arbitration orders, judgments awards or other legal processes served or in compliance with requests by any entitled authority, body or person or to protect the interests, rights, property of DongJin Shipping, our users or others

In addition, DongJin Shipping may disclose any information and/or data registered via www.djship.co.kr/ to and co-operate with authorities in any jurisdiction in relation to any direction or request to disclose such information and/or data regarding any user or the use of the website, content or services. 

Should any information or data be transferred to a recipient based outside, DongJin Shipping will ensure prior to such transfer that the recipient’s level of data protection is sufficient. 

During your use of our website we automatically collect IP addresses and other information concerning your use of our website in order to (i) help diagnose problems with our server,? (ii) identify ways of making our site better, (iii) ensure that the website is used in accordance with relevant legislation and the applicable user terms, and (iv) for any processing which DongJin Shipping is required to perform under applicable law, court or arbitration orders, judgments awards or other legal processes served or for the processing of information as set out above. 

Cookies 
A cookie is information that a web site puts on your hard disk so that it can remember something about you at a later time. (More technically, it is information for future use that is stored by the server on the client side of a client/server communication.) We use 'cookies' to generate digital certificates that identifies the user when logging on to our interactive shipping services. 'Cookies' are also used to control the correct display of the website navigation bar. 

VOC(Voice of Customer)
What is Voice of Customer?
VOC is an on-line user and e-business support function providing technical and business support for the DongJin Shipping website. 
VOC is designed to provide: 
online problem solving 
management of customer queries 
facilitate and ensure follow-up by the DongJin Shipping organization 
VOC is not intended to negotiate or settle on-line issues of commercial or contractual nature or the like matters. However, VOC will relay and manage such matters internally in DongJin Shipping to ensure follow-up - all to the benefit of our website users. 
To the benefit of our website users, we will record and keep transcripts of all communications concerning support issues raised through www.djship.co.kr/. 
This is done only to facilitate any repeated or recurring contacts on issues addressed earlier by the individual user and for internal education and training purposes. Transcripts will be stored in a secure and confidential manner and, except as may be required to comply with prevailing law or judgments, awards, orders and the like, or to meet the well-founded and reasonable requests by a public authority, body or person, will be available only to DongJin Shipping and the concerned user. Transcripts will be stored for 5 years except where a user in writing has specifically requested for its deletion. 

Update/Removal 
You may update, change or opt for removal of information registered at www.djship.co.kr/ either by sending the changes to your local DongJin Shipping office (use the Contact link on the website to locate your local DongJin Shipping office and its contact details). 

Links 
This site contains links to other third party websites. www.djship.co.kr/ is not responsible for the privacy practices or content of such third party web sites. 

Contact 
If you have any questions or comments about privacy, the use of this web site, or your dealings with this web site you can contact: 

Phone : +82-2-2287-6000
E-mail : webmaster@djship.co.kr
e-Service Part
Customer Service Team 
DongJin Shipping  
2nd Fl., Paiknam Building, 16, Eulji-ro, Jung-gu 
SEOUL KOREA
`;

  return (
    <>
      <SubTitle title="Privacy and Security Policy" />
      <p className="text-balance">
        {policyText.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </>
  );
};
