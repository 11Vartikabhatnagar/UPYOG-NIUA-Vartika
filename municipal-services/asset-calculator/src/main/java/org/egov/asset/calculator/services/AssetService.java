package org.egov.asset.calculator.services;

import java.util.LinkedHashMap;

import org.egov.common.contract.request.RequestInfo;
import org.egov.asset.calculator.config.CalculatorConfig;
import org.egov.asset.calculator.repository.ServiceRequestRepository;
import org.egov.asset.calculator.utils.CalculatorConstants;
import org.egov.asset.calculator.web.models.FSM;
import org.egov.asset.calculator.web.models.FSMResponse;
import org.egov.asset.calculator.web.models.RequestInfoWrapper;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Service
public class AssetService {

	@Autowired
	private ServiceRequestRepository serviceRequestRepository;

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private CalculatorConfig config;

	public FSM getAssetApplication(RequestInfo requestInfo, String tenantId, String applicationNo) {
		StringBuilder url = getBPASearchURL();
		url.append("tenantId=");
		url.append(tenantId);

		url.append("&");
		url.append("applicationNo=");
		url.append(applicationNo);

		LinkedHashMap responseMap = null;
		responseMap = (LinkedHashMap) serviceRequestRepository.fetchResult(url, new RequestInfoWrapper(requestInfo));

		FSMResponse fsmResponse = null;

		try {
			fsmResponse = mapper.convertValue(responseMap, FSMResponse.class);
		} catch (IllegalArgumentException e) {
			throw new CustomException(CalculatorConstants.PARSING_ERROR,
					"Error while parsing response of FSM Application Search");
		}

		if (fsmResponse.getFsm().isEmpty()) {
			throw new CustomException(CalculatorConstants.APPLICATION_NOT_FOUND,
					"Application with applicationNo: " + applicationNo + " not found !");
		}

		return fsmResponse.getFsm().get(0);
	}

	private StringBuilder getBPASearchURL() {
		StringBuilder url = new StringBuilder(config.getFsmHost());
		url.append(config.getFsmContextPath());
		url.append(config.getFsmSearchEndpoint());
		url.append("?");
		return url;
	}


}
