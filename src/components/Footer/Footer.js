import React from "react";
import "./Footer.css";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import close from "../../assets/close.png";
// import { Modal,Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  const [DisclaimerShow, setDisclaimerShow] = React.useState(true);
  const [PrivacyPolicyShow, setPrivacyPolicyShow] = React.useState(true);
  const [DonationsShow, setDonationsShow] = React.useState(true);
  // const [ContactUsShow, setContactUsShow] = React.useState(true);

  return (
    <div className="container">
      {DisclaimerShow ? (
        <div className="modal__container">
          <div className="modal__title">
            <div>Disclaimer</div>
            <img
              width={"20px"}
              src={close}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDisclaimerShow(false);
              }}
            />
          </div>
          <div className="modal__body">
            © 2021-2022 ShibFinder.com
            <br />
            <br />
            The presented content may include the personal opinion of the author
            and is subject to market condition. Do your market research before
            investing in cryptocurrencies. The author or the publication does
            not hold any responsibility for your personal financial loss.
            <br />
            <br />
            This site is built and maintained on a free time basis. Usage of
            this site is free but the owners of the site, domain and all
            corresponding sites, social media accounts, a.s.o. on are not
            responsible or reliable in any way for any loss of data, improper
            data or otherwise. We provide this site on a use-at-your-own-risk
            basis.
          </div>
        </div>
      ) : null}
      {PrivacyPolicyShow ? (
        <div className="modal__container">
          <div className="modal__title">
            <div>Privacy Policy</div>
            <img
              width={"20px"}
              src={close}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setPrivacyPolicyShow(false);
              }}
            />
          </div>
          <div className="modal__body">
            Shibfinder.com, (“ShibFinder”, “We”, “Us” and “Our”) protects and
            respects the privacy of visitors to Our website (www.shibfinder.com)
            and our user (“User”, “You”, “Yourself”) who use our services. To
            ensure transparency on our Privacy Policy, this Privacy Policy
            describes data handling practices when you access content that we
            own or operate on the website that is located on www.shibfinder.com
            and its subdomains or third-party applications that are in use.
            Please take as long as you want to read this Privacy Policy
            carefully. If you have any questions regarding our Privacy Policy,
            please contact us on shibfinder@gmail.com.
            <br />
            <br />
            Acceptance of Privacy Policy By accessing and using our Services,
            you hereby declare your acceptance to the terms of this Privacy
            Policy. If you do not agree with or are not comfortable with any
            aspect of this Privacy Policy, you should immediately discontinue to
            access or use of our Services and Website.
            <br />
            <br />
            Changes on This Privacy Policy Shibfinder.com reserves the right of
            change and modify this Privacy Policy at any time and when required
            by law or otherwise, Shibfinder.com will not notify you via social
            media of any changes to this Privacy Policy. Shibfinder.com will not
            notify Users by email for any changes by means of notice on our
            Privacy Policy. Visitors of the Website are required to check
            Privacy Policy on the website for any changes.
            <br />
            <br />
            Purpose of Collecting Personal Information Personal information is
            the data that can be used to identify you directly or indirectly.
            Our Privacy Policy is gathered by all the personal information that
            you willingly submitted tous. This Privacy Policy does not apply to
            any anonymised data, as it cannot be used to identify you. You may
            be asked to provide personal information anytime you are in contact
            with any Shibfinder.com. The information that we gathered, may also
            be combined with other information to provide and improve our
            services and content. Hereby, Shibfinder.com assures you that it
            will not give, sell, rent or loan any personal information to any
            third party.
            <br />
            <br />
            Scope of Personal Information Collected Shibfinder.com collects
            personal information to provide you with its Services and Website.
            It may be required by law to require certain personal information
            from Users or it is required to eliminate fraudulent use of personal
            data. Any information that you provide to us that is not required is
            voluntary. You are not obliged to provide any personal information
            when its requested, however, Shibfinder.com may not be able to serve
            you as expected or offer you all the Services when you do choose not
            to share the requested information.
            <br />
            <br />
            Shibfinder.com collects the following types of personal information:
            <br />• Your location.
            <br />
            <br />
            And when you want to add a place: <br />• Your First Name. <br />•
            Your Last Name.
            <br /> • Your Email address.
            <br />
            <br />
            Usage of Personal Information Primary purpose in collecting personal
            information is to provide secure and customised service experience.
            Overall, the personal information that are gathered, are mainly to
            use on creating and delivering our Services and contents and most
            importantly prevention of any fraudulent activities.
            <br />
            <br />
            The usage of the login mechanism is at your own risk. We are never
            reliable or responsible for any data leaks or mis usage. When you
            use this website you comply with all terms in this privacy policy
            and disclaimer.
          </div>
        </div>
      ) : null}
      {DonationsShow ? (
        <div className="modal__container">
          <div className="modal__title">
            <div>Donations</div>
            <img
              width={"20px"}
              src={close}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDonationsShow(false);
              }}
            />
          </div>
          <div className="modal__body">
            We love donations, this keeps this site running.
            <br />
            <br />
            Send your $SHIB to (ETH Network):
            0x639dead4cb2352c7aa16818f788eeffbbe9ccae6
            <br />
            <br />
            We will burn 50% of every donation to a dead wallet
            (https://www.shibburn.com/page/burn-addresses) and use 50% for
            maintaining this site.
          </div>
        </div>
      ) : null}
      <div className="modal__links">
        <div
          className="one__modal__link"
          onClick={() => {
            setDisclaimerShow(true);
          }}
        >
          Disclaimer
        </div>
        <div
          className="one__modal__link"
          onClick={() => {
            setDonationsShow(true);
          }}
        >
          Donations
        </div>
        <div
          className="one__modal__link"
          onClick={() => {
            setPrivacyPolicyShow(true);
          }}
        >
          Privacy Policy
        </div>
      </div>
      <div className="contact__us">
          <h3 style={{margin:"0",padding:"0",paddingRight:"20px",paddingBottom:"5px",color:"white",fontWeight:"bold"}}>Contact Us</h3>
          If you have questions or concerns regarding this Privacy Policy, you
          can contact us at <span style={{textDecoration:"underline"}}>shibfinder@gmail.com</span>
          <br />
          All artwork and information/data rights belong to their respective
          owners.
        </div>
        <br />
      {/* <div className="social_icons">
        <img alt="facebook" className="one_icon" src={facebook} />
        <img alt="instagram" className="one_icon" src={instagram} />
        <img alt="twitter" className="one_icon" src={twitter} />
      </div> */}
    </div>
  );
}

export default Footer;
