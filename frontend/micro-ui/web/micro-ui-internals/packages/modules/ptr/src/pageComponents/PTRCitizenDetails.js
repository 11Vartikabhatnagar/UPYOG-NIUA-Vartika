import React, { useEffect, useState } from "react";
import { FormStep, TextInput, CardLabel, MobileNumber } from "@nudmcdgnpm/digit-ui-react-components";
import Timeline from "../components/PTRTimeline";

const PTRCitizenDetails = ({ t, config, onSelect, userType, formData, renewApplication }) => {
  let index = 0
  const user = Digit.UserService.getUser().info; // service to fetch user information
  let validation = {};

  // added data from renewapplication, renders data if there is data in renewapplication
  const [applicantName, setName] = useState(renewApplication?.applicantName || user?.name || formData?.ownerss?.applicantName || "");
  const [emailId, setEmail] = useState(renewApplication?.emailId || formData?.ownerss?.emailId || "");
  const [mobileNumber, setMobileNumber] = useState(renewApplication?.mobileNumber || user?.mobileNumber || formData?.ownerss?.mobileNumber || "");
  const [alternateNumber, setAltMobileNumber] = useState(formData?.ownerss?.alternateNumber || "");
  const [fatherName, setFatherOrHusbandName] = useState(renewApplication?.fatherName || formData?.ownerss?.fatherName || "");

  function setOwnerName(e) {
    setName(e.target.value);
  }
  function setOwnerEmail(e) {
    setEmail(e.target.value);
  }
  function setMobileNo(e) {
    setMobileNumber(e.target.value);
  }
  function setAltMobileNo(e) {
    setAltMobileNumber(e.target.value);
  }
  function setGuardiansName(e) {
    setFatherOrHusbandName(e.target.value);
  }
  
  const goNext = () => {
    let owner = formData.ownerss && formData.ownerss[index];
    let ownerStep;
    if (userType === "citizen") {
      ownerStep = { ...owner, applicantName, mobileNumber,alternateNumber, fatherName, emailId};
      onSelect(config.key, { ...formData[config.key], ...ownerStep }, false, index);
    } else {
      ownerStep = { ...owner, applicantName,  mobileNumber,alternateNumber, fatherName,emailId };
      onSelect(config.key, ownerStep, false,index);
    }
  };

  const onSkip = () => onSelect();

  useEffect(() => {
    if (userType === "citizen") {
      goNext();
    }
  }, [applicantName, mobileNumber, fatherName, emailId]);

 

  return (
    <React.Fragment>
    {
      window.location.href.includes("/citizen") ?
 <Timeline currentStep={1} />
    : null
    }

    <FormStep
      config={config}
      onSelect={goNext}
      onSkip={onSkip}
      t={t}
      isDisabled={!applicantName || !mobileNumber || !fatherName || !emailId}
    >
      <div>
        <CardLabel>{`${t("PTR_APPLICANT_NAME")}`} <span className="astericColor">*</span></CardLabel>
        <TextInput
          t={t}
          type={"text"}
          isMandatory={false}
          optionKey="i18nKey"
          name="applicantName"
          value={applicantName}
          onChange={setOwnerName}
          ValidationRequired = {true}
          {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z ]+$",
            type: "tel",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })}
        />
       
        <CardLabel>{`${t("PTR_MOBILE_NUMBER")}`} <span className="astericColor">*</span></CardLabel>
        <MobileNumber
          value={mobileNumber}
          name="mobileNumber"
          onChange={(value) => setMobileNo({ target: { value } })}
          {...{ required: true, pattern: "[6-9]{1}[0-9]{9}", type: "tel", title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID") }}
        />

        <CardLabel>{`${t("PTR_ALT_MOBILE_NUMBER")}`}</CardLabel>
          <MobileNumber
            value={alternateNumber}
            name="alternateNumber"
            onChange={(value) => setAltMobileNo({ target: { value } })}
            {...{ required: false, pattern: "[6-9]{1}[0-9]{9}", type: "tel", title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID") }}
          />
        <CardLabel>{`${t("PTR_FATHER_HUSBAND_NAME")}`} <span className="astericColor">*</span></CardLabel>
        <TextInput
          t={t}
          type={"text"}
          isMandatory={false}
          optionKey="i18nKey"
          name="fatherName"
          value={fatherName}
          onChange={setGuardiansName}
          ValidationRequired = {true}
          {...(validation = {
            isRequired: true,
            pattern: "^[a-zA-Z ]+$",
            type: "tel",
            title: t("PT_NAME_ERROR_MESSAGE"),
          })}
        />
      <CardLabel>{`${t("PTR_EMAIL_ID")}`} <span className="astericColor">*</span></CardLabel>
      <TextInput
        t={t}
        type={"email"}
        isMandatory={true}
        optionKey="i18nKey"
        name="emailId"
        value={emailId}
        onChange={setOwnerEmail}
        ValidationRequired={true}
        {...(validation = {
          isRequired: true,
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]{3,4}$",
          type: "email",
          title: t("PT_NAME_ERROR_MESSAGE"),
        })}
      />
        
        
      </div>
    </FormStep>
    </React.Fragment>
  );
};

export default PTRCitizenDetails;