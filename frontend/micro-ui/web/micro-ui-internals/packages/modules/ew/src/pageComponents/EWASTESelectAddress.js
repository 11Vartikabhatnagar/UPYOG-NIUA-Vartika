import { CardLabel, CardLabelError, Dropdown, FormStep, LabelFieldPair, RadioOrSelect } from "@upyog/digit-ui-react-components";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Timeline from "../components/EWASTETimeline";

const EWASTESelectAddress = ({ t, config, onSelect, userType, formData, setError, clearErrors, formState }) => {
  const allCities = Digit.Hooks.ew?.useTenants();
  let tenantId = Digit.ULBService.getCurrentTenantId();
  const { pathname } = useLocation();
  const presentInModifyApplication = pathname.includes("modify");
  
 
  let isEditAddress = formData?.isEditAddress || false;
  if (presentInModifyApplication) isEditAddress = true;
  
  const { pincode, city } = formData?.address || "";
  const cities =
    userType === "employee" ? allCities.filter((city) => city.code === tenantId) : pincode  ? allCities.filter((city) => city?.pincode?.some((pin) => pin == pincode)) : allCities;

  const [selectedCity, setSelectedCity] = useState(() => {
    return formData?.address?.city || null;
  });

  const { data: fetchedLocalities } = Digit.Hooks.useBoundaryLocalities(
    selectedCity?.code,
     "revenue",
    {
      enabled: !!selectedCity,
    },
    t
  );

  const [localities, setLocalities] = useState();

  const [selectedLocality, setSelectedLocality] = useState();

  useEffect(() => {
    if (userType === "employee" && presentInModifyApplication && localities?.length) {
      const code = formData?.originalData?.address?.locality?.code;
      const _locality = localities?.filter((e) => e.code === code)[0];
      setValue("locality", _locality);
    }
  }, [localities]);

  useEffect(() => {
    if (cities) {
      if (cities.length === 1) {
        setSelectedCity(cities[0]);
      }
    }
  }, [cities]);

  useEffect(() => {
    if (selectedCity && fetchedLocalities) {
      let __localityList = fetchedLocalities;
      let filteredLocalityList = [];

      if (formData?.address?.locality) {
        setSelectedLocality(formData.address.locality);
      }

      if (formData?.address?.pincode) {
        filteredLocalityList = __localityList.filter((obj) => obj.pincode?.find((item) => item == formData.address.pincode));
        if (!formData?.address?.locality) setSelectedLocality();
      }
      setLocalities(() => (filteredLocalityList.length > 0 ? filteredLocalityList : __localityList));

      if (filteredLocalityList.length === 1) {
        setSelectedLocality(filteredLocalityList[0]);
        // if (userType === "employee") {
        //   onSelect(config.key, { ...formData[config.key], locality: filteredLocalityList[0] });
        // }
      }
    }
  }, [selectedCity, formData?.address?.pincode, fetchedLocalities]);

  

  function selectCity(city) {
    setSelectedLocality(null);
    setLocalities(null);
    setSelectedCity(city);
  }

  function selectLocality(locality) {
    if (formData?.address?.locality) {
      formData.address["locality"] = locality;
    }
    setSelectedLocality(locality);
    if (userType === "employee") {
      onSelect(config.key, { ...formData[config.key], locality: locality });
    }
  }

  function onSubmit() {
    onSelect(config.key, { city: selectedCity, locality: selectedLocality });
  }

  const { control, formState: localFormState, watch, /*setError: setLocalError, clearErrors: clearLocalErrors,*/ setValue } = useForm();
  const formValue = watch();
  const { errors } = localFormState;
  const errorStyle = { width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" };

  useEffect(() => {
    if (userType === "employee") {
      let keys = Object.keys(formValue);
      const part = {};
      keys.forEach((key) => (part[key] = formData[config.key]?.[key]));
      if (!_.isEqual(formValue, part)) onSelect(config.key, { ...formData[config.key], ...formValue });
      for (let key in formValue) {
        if (!formValue[key] && !localFormState?.errors[key]) {
          // setLocalError(key, { type: `${key.toUpperCase()}_REQUIRED`, message: t(`CORE_COMMON_REQUIRED_ERRMSG`) });
        } else if (formValue[key] && localFormState.errors[key]) {
          // clearLocalErrors([key]);
        }
      }
    }
  }, [formValue]);

  useEffect(() => {
    if (userType === "employee") {
      const errorsPresent = !!Object.keys(localFormState.errors).lengtha;
      if (errorsPresent && !formState.errors?.[config.key]) /*setError(config.key, { type: "required" })*/;
      else if (!errorsPresent && formState.errors?.[config.key]) /*clearErrors(config.key)*/;
    }
  }, [localFormState]);

  if (userType === "employee") {
    return (
      <div>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">{t("MYCITY_CODE_LABEL") + " *"}</CardLabel>
          <Controller
            name={"city"}
            defaultValue={cities?.length === 1 ? cities[0] : selectedCity}
            control={control}
            render={(props) => (
              <Dropdown
                className="form-field"
                selected={props.value}
                disable={isEditAddress ? isEditAddress : cities?.length === 1}
                option={cities}
                select={props.onChange}
                optionKey="code"
                onBlur={props.onBlur}
                t={t}
              />
            )}
          />
        </LabelFieldPair>
        <CardLabelError style={errorStyle}>{localFormState.touched.city ? errors?.city?.message : ""}</CardLabelError>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">{t("EWASTE_LOCALITY") + " *"}</CardLabel>
          <Controller
            name="locality"
            defaultValue={null}
            control={control}
            render={(props) => (
              <Dropdown
                className="form-field"
                selected={props.value}
                option={localities}
                select={props.onChange}
                onBlur={props.onBlur}
                optionKey="i18nkey"
                t={t}
                disable={isEditAddress ? isEditAddress : false}
              />
            )}
          />
        </LabelFieldPair>
        <CardLabelError style={errorStyle}>{localFormState.touched.locality ? errors?.locality?.message : ""}</CardLabelError>
      </div>
    );
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      <FormStep config={config} onSelect={onSubmit} t={t}
      //  isDisabled={selectedLocality ? false : true}
       >
        <div>
          <CardLabel>{`${t("MYCITY_CODE_LABEL")} `}</CardLabel>
          <span className={"form-ptr-dropdown-only"}>
            <RadioOrSelect
              options={cities?.sort((a, b) => a.name.localeCompare(b.name))}
              selectedOption={selectedCity}
              optionKey="i18nKey"
              onSelect={selectCity}
              t={t}
              isPTFlow={true}
              //isDependent={true}
              //labelKey="TENANT_TENANTS"
              disabled={isEditAddress}
            />
          </span>
          {selectedCity && localities && <CardLabel>{`${t("EWASTE_LOCALITY")} `}</CardLabel>}
          {selectedCity && localities && (
            <span className={"form-ptr-dropdown-only"}>
              <RadioOrSelect
                dropdownStyle={{ paddingBottom: "20px" }}
                isMandatory={config.isMandatory}
                options={localities.sort((a, b) => a.name.localeCompare(b.name))}
                selectedOption={selectedLocality}
                optionKey="i18nkey"
                onSelect={selectLocality}
                t={t}
                //isDependent={true}
                labelKey=""
                disabled={isEditAddress}
              />
            </span>
          )}
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default EWASTESelectAddress;
