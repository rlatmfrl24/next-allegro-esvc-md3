import { DividerComponent } from "@/app/components/divider";
import { DetailTitle, SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";

export const PolicyContent = () => {
  return (
    <div className="px-6 pb-6 pt-2">
      <MdTypography variant="title" size="medium">
        Privacy and Security Policy
      </MdTypography>
      <Paragraph
        text={`
      e-SERVICE Co.,Ltd. Privacy Policy. 

At e-SERVICE Co.,Ltd.(hereinafter referred to as "the company") we consider the protection of personal information to be one of the most important rights an individual has. 
Theprotection of a customer's rights is one of the foundations of the company, indeed it is a duty. 
The company's personal information protection policy is set out as follows. All executives andemployees of the company as well as collaborating third parties undergo thorough training with regard to the policy.
        `}
      />
      <DetailTitle title="1. Appropriate collection, use, provision, and entrustment of personal information." />
      <Paragraph
        text={`
      1) When collecting a user's personal information, it must be made clear to the user for what aim the information is being collected and the user's agreement must be received. 
The scope of use ofthe personal information must be pre-defined, and the handling of the information must be appropriate.
 
2) In some cases, collected personal information may be provided to third parties in line with the stipulated uses of the information and within the pre-defined scope of use. 
In such cases the reasonfor collecting the information must be made clear, the agreement of the user must be received and the handling of the information must be appropriate.
 
3) In some cases, collected personal information may be entrusted to third parties to ensure smooth running of the company's business. 
In such cases, third parties who adhere to adequatepersonal information protection policies must be selected and these protection standards must be drawn up in a contract to ensure appropriate handling of the information.
      `}
      />
      <DividerComponent className="border-dotted mb-4" />
      <DetailTitle title="2. Prevention and/or redress of loss, destruction, corruption, leaking or unauthorized access of personal information." />
      <Paragraph
        text={`
      The company carefully manages users' personal information and implements preventative measures against risks including corruption, leakage and unauthorized access. 
There are concrete rules forthe appropriate handling of personal information and the company has appointed staff members who are responsible for their implementation.
        `}
      />
      <DividerComponent className="border-dotted mb-4" />
      <DetailTitle title="3. Adherence to Rules and Regulations concerning Personal Information" />
      <Paragraph
        text={`
      All executives and employees of the company as well as collaborating third parties strictly adhere to all domestic and international rules and guidelines pertaining to the protection of personalinformation.
        `}
      />
      <DividerComponent className="border-dotted mb-4" />
      <DetailTitle title="4. Continuous improvement of personal information protection policies and of in-house regulations " />
      <Paragraph
        text={`
        To ensure efficient implementation of personal information protection as required by society, the company is continuously improving its personal information protection policies and in-houseguidelines.

The company may revise the above policies.
All revisions will be published on this website.
`}
      />
      <MdTypography variant="body" size="medium" prominent>
        ¡ Personal information collected from users via the company website
      </MdTypography>
      <Paragraph
        text={`The aim of this website is to provide information about Kambara Kisen Co.,Ltd. In some sections of the website, the user is asked to give personal information (questionnaires, inquiries, or whenapplying for employment, etc.). 
In most cases the user is asked to give his/her name, e-mail address, telephone number, and address. 
There are times when the site requests further information,but provision of this information is optional and the user only provides it with his/her consent. 
User information is never altered without the consent of the user.
 
Furthermore, when a users asks for disclosure of the personal information about him/herself, the company takes all measures to ensure that the user's privacy is respected in an appropriatefashion.
        `}
      />
      <MdTypography variant="body" size="medium" prominent>
        ¡ Applicable Laws
      </MdTypography>
      <Paragraph
        text={`This website is managed by Kambara Kisen Co.,Ltd.
The website can be accessed from countries around the world, each with their respective laws. 
However, for both the user and the company,irrespective of the different legal principles they may beunder, the laws applicable to the use of this site will be the laws of Japan and the regulations of Hiroshima Prefecture. Furthermore, the company does make any declaration on this site stipulatingthat the content of the site is appropriate to the environment of the user. The site is accessed on the user's own free will, and the user takes full responsibility for his/her access.
        `}
      />
      <MdTypography variant="body" size="medium" prominent>
        ¡ Guarantee and Limitation of Liability
      </MdTypography>
      <Paragraph
        text={`The user takes responsibility for his/her use of the site. 
The company does not take responsibility for any damages or losses incurred due to use of the site or other sites linked to the site.
`}
      />
      <MdTypography variant="body" size="medium" prominent>
        ¡ Use of Cookies
      </MdTypography>
      <Paragraph
        text={`Cookies are used by the website to ensure greater ease of use for users when visiting the site for the second time. Cookies are pieces of information sent by the site to the user's browser, andthese are stored in the user's computer. However, personal details which may allow for recognition of the user, such as the user's name, address, telephone number, and e-mail address are neverincluded.
 Furthermore, stored cookies will have no detrimental effect on the user's computer. 
The user can set his/her browser so that it rejects cookies, and this has no detrimental effect on the browsing experience. 
For details on how to change the settings of your browser please directinquiries to the software provider.`}
      />
    </div>
  );
};

const Paragraph = ({ text }: { text: string }) => {
  return (
    <MdTypography variant="body" size="medium">
      {text.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </MdTypography>
  );
};
