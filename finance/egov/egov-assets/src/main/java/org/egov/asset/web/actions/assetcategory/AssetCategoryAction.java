/**
 * eGov suite of products aim to improve the internal efficiency,transparency,
   accountability and the service delivery of the government  organizations.

    Copyright (C) <2015>  eGovernments Foundation

    The updated version of eGov suite of products as by eGovernments Foundation
    is available at http://www.egovernments.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see http://www.gnu.org/licenses/ or
    http://www.gnu.org/licenses/gpl.html .

    In addition to the terms of the GPL license to be adhered to in using this
    program, the following additional terms are to be complied with:

	1) All versions of this program, verbatim or modified must carry this
	   Legal Notice.

	2) Any misrepresentation of the origin of the material is prohibited. It
	   is required that all modified versions of this material be marked in
	   reasonable ways as different from the original version.

	3) This license does not grant any rights to any user of the program
	   with regards to rights under trademark law for use of the trade names
	   or trademarks of eGovernments Foundation.

  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */
package org.egov.asset.web.actions.assetcategory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.egov.asset.model.AssetCategory;
import org.egov.asset.model.AssetType;
import org.egov.asset.model.DepreciationMetaData;
import org.egov.asset.model.DepreciationMethod;
import org.egov.asset.service.AppService;
import org.egov.asset.service.AssetCategoryService;
import org.egov.common.entity.UOM;
import org.egov.commons.CChartOfAccounts;
import org.egov.commons.CFinancialYear;
import org.egov.commons.service.CommonsService;
import org.egov.exceptions.EGOVException;
import org.egov.exceptions.EGOVRuntimeException;
import org.egov.infra.admin.master.entity.Department;
import org.egov.infra.web.struts.actions.BaseFormAction;
import org.egov.infra.web.struts.annotation.ValidationErrorPage;
import org.egov.infstr.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@ParentPackage("egov")
@Transactional(readOnly = true)
@Namespace("/assetcategory")
@Results({
    @Result(name = AssetCategoryAction.NEW, location = "/WEB-INF/jsp/assets/assetcategory/assetCategory-new.jsp"),
    @Result(name = AssetCategoryAction.SEARCH, location = "/WEB-INF/jsp/assets/assetcategory/assetCategory-search.jsp"),
    @Result(name = AssetCategoryAction.EDIT, location = "/WEB-INF/jsp/assets/assetcategory/assetCategory-edit.jsp") })
public class AssetCategoryAction extends BaseFormAction {

    private static final long serialVersionUID = -1510474404320433556L;
    public static final String SEARCH = "search";
    public static final String VIEW = "view";
    private static final Logger LOGGER = Logger.getLogger(AssetCategoryAction.class);
    private AssetCategoryService assetCategoryService;
    private AppService appService;
    private AssetCategory assetCategory = new AssetCategory();
    private List<AssetCategory> assetCategoryList = null;
    private List<DepreciationMetaData> depMetaDatas = new LinkedList<DepreciationMetaData>();
    private Long id;
    private String assetType;
    private Long parentId;

    // Purpose code keys
    private String assetAccCodePURPOSEID = "ASSET_ACCOUNT_CODE_PURPOSEID";
    private String revResAccPURPOSEID = "REVALUATION_RESERVE_ACCOUNT_PURPOSEID";
    private String depExpAccPURPOSEID = "DEPRECIATION_EXPENSE_ACCOUNT_PURPOSEID";
    private String accDepPURPOSEID = "ACCUMULATED_DEPRECIATION_PURPOSEID";

    // UI fields
    private String userMode;
    private boolean fDisabled;
    private boolean sDisabled;
    private String dataDisplayStyle;
    private String isAutoGeneratedCode;

    @Autowired
    private CommonsService commonsService;

    /**
     * Default Constructor
     */
    public AssetCategoryAction() {
        addRelatedEntity("assetAccountCode", CChartOfAccounts.class);
        addRelatedEntity("accDepAccountCode", CChartOfAccounts.class);
        addRelatedEntity("revAccountCode", CChartOfAccounts.class);
        addRelatedEntity("depExpAccountCode", CChartOfAccounts.class);
        addRelatedEntity("financialYear", CFinancialYear.class);
        addRelatedEntity("department", Department.class);
        addRelatedEntity("uom", UOM.class);
    }

    @Override
    public void prepare() {
        final String module_asset = "Assets";
        isAutoGeneratedCode = appService.getUniqueAppConfigValue("IS_ASSET_CATEGORYCODE_AUTOGENERATED");
        if (id != null && id != -1)
            assetCategory = assetCategoryService.findById(id, false);
        super.prepare();

        setupDropdownDataExcluding("assetAccountCode", "accDepAccountCode", "revAccountCode", "depExpAccountCode");
        addDropdownData("assetTypeList", Arrays.asList(AssetType.values()));
        addDropdownData("depreciationMethodList", Arrays.asList(DepreciationMethod.values()));
        try {
            final String purposeId = appService.getUniqueAppConfigValue(module_asset, assetAccCodePURPOSEID);
            final List<CChartOfAccounts> assetAccounts = commonsService.getAccountCodeByPurpose(Integer
                    .valueOf(purposeId));
            addDropdownData("assetAccountCodeList", assetAccounts);
        } catch (final EGOVException e) {
            LOGGER.error("Error while loading dropdown data - assetAccountCodeList." + e.getMessage());
            addFieldError("assetAccountCodeList", "Unable to load asset account information");
            throw new EGOVRuntimeException("Unable to load asset account information", e);
        }

        try {
            final String purposeId = appService.getUniqueAppConfigValue(module_asset, accDepPURPOSEID);
            final List<CChartOfAccounts> accumulatedDeps = commonsService.getAccountCodeByPurpose(Integer
                    .valueOf(purposeId));
            addDropdownData("accDepAccountCodeList", accumulatedDeps);
        } catch (final EGOVException e) {
            LOGGER.error("Error while loading dropdown data - accDepAccountCodeList." + e.getMessage());
            addFieldError("accDepAccountCodeList", "Unable to load accumulated depreciation information");
            throw new EGOVRuntimeException("Unable to load accumulated depreciation information", e);
        }

        try {
            final String purposeId = appService.getUniqueAppConfigValue(module_asset, revResAccPURPOSEID);
            final List<CChartOfAccounts> revAccounts = commonsService.getAccountCodeByPurpose(Integer
                    .valueOf(purposeId));
            addDropdownData("revAccountCodeList", revAccounts);
        } catch (final EGOVException e) {
            LOGGER.error("Error while loading dropdown data - revAccountCodeList." + e.getMessage());
            addFieldError("revAccountCodeList", "Unable to load revaluation account information");
            throw new EGOVRuntimeException("Unable to load revaluation account information", e);
        }

        try {
            final String purposeId = appService.getUniqueAppConfigValue(module_asset, depExpAccPURPOSEID);
            final List<CChartOfAccounts> depExpenseAccounts = commonsService.getAccountCodeByPurpose(Integer
                    .valueOf(purposeId));
            addDropdownData("depExpAccountCodeList", depExpenseAccounts);
        } catch (final EGOVException e) {
            LOGGER.error("Error while loading dropdown data - depExpAccountCodeList." + e.getMessage());
            addFieldError("depExpAccountCodeList", "Unable to load depreciation expense account information");
            throw new EGOVRuntimeException("Unable to load depreciation expense account information", e);
        }
    }

    /**
     * This method is invoked to create a new form.
     *
     * @return a <code>String</code> representing the value 'NEW'
     */
    @Action(value = "/assetCategory-newform")
    public String newform() {
        userMode = NEW;
        return showform();
    }
    
    @Action(value = "/assetCategory-showform")
    public String showform() {
        String result = null;

        if (userMode == null)
            userMode = NEW;
        if (NEW.equals(userMode)) {
            fDisabled = false;
            sDisabled = false;
            result = NEW;
        } else if (VIEW.equals(userMode)) {
            if (id == null) {
                addActionError(getText("asset.category.id.null"));
                result = SEARCH;
            } else {
                fDisabled = true;
                sDisabled = true;
                result = NEW;
            }
        } else if (EDIT.equals(userMode))
            if (id == null) {
                addActionError(getText("asset.category.id.null"));
                result = SEARCH;
            } else {
                fDisabled = false;
                sDisabled = true;
                result = NEW;
            }
        return result;
    }

    @Action(value = "/assetCategory-edit")
    public String edit() {
        userMode = EDIT;
        dataDisplayStyle = "none";
        return SEARCH;
    }

    @Action(value = "/assetCategory-view")
    public String view() {
        userMode = VIEW;
        dataDisplayStyle = "none";
        return SEARCH;
    }

    @Action(value = "/assetCategory-list")
    public String list() {
        if (!assetType.equalsIgnoreCase("-1") && (id == null || id == -1))
            assetCategoryList = assetCategoryService.findAllBy("from AssetCategory ac order by name asc");
        else if (!assetType.equalsIgnoreCase("-1") && (id == null || id == -1))
            assetCategoryList = assetCategoryService.findAllBy("from AssetCategory ac where ac.assetType=" + assetType
                    + " order by name asc");
        else if (id != null && id != -1) {
            assetCategoryList = new ArrayList<AssetCategory>();
            assetCategoryList.add(assetCategoryService.findById(id, false));
        }
        if (assetCategoryList == null || assetCategoryList.isEmpty())
            dataDisplayStyle = "noRecords";
        else
            dataDisplayStyle = "display";

        return SEARCH;
    }

    /**
     * The default action method
     */
    @Override
    public String execute() {
        return list();
    }

    @ValidationErrorPage(value = EDIT)
    @Transactional
    @Action(value = "/assetCategory-save")
    public String save() throws NumberFormatException, EGOVException {
        addDepMetaDatas();
        if (parentId != null && parentId != -1L)
            assetCategory.setParent(assetCategoryService.findById(parentId, false));
        assetCategoryService.setAssetCategoryNumber(assetCategory);
        try {
            assetCategory = assetCategoryService.persist(assetCategory);
        } catch (final ValidationException valEx) {
            LOGGER.error("Exception found while persisting asset category: " + valEx.getErrors());
            throw new ValidationException(valEx.getErrors());

        }
        addActionMessage("\'" + assetCategory.getCode() + "\' " + getText("asset.category.save.success"));
        userMode = EDIT;
        id = assetCategory.getId();
        return showform();
    }

    @Transactional
    protected void addDepMetaDatas() {
        assetCategory.getDepreciationMetaDataList().clear();
        for (final DepreciationMetaData lDepreciationMetaData : depMetaDatas)
            if (validDepMetaData(lDepreciationMetaData)) {
                lDepreciationMetaData.setFinancialYear((CFinancialYear) getPersistenceService().find(
                        "from CFinancialYear where id = ?", lDepreciationMetaData.getFinancialYear().getId()));
                lDepreciationMetaData.setAssetCategory(assetCategory);
                assetCategory.addDepreciationMetaData(lDepreciationMetaData);
            }

    }

    protected boolean validDepMetaData(final DepreciationMetaData tDepreciationMetaData) {
        if (tDepreciationMetaData != null && tDepreciationMetaData.getFinancialYear() != null
                && tDepreciationMetaData.getFinancialYear().getId() != null
                && tDepreciationMetaData.getDepreciationRate() != null
                && tDepreciationMetaData.getDepreciationRate() >= 0F)
            return true;

        return false;
    }

    /**
     * This method will return list of asset category. Native query is used
     * instead of HQL to get rid of dirty session issue(InvalidStateException).
     *
     * @return
     */
    public Map<Long, String> getParentMap() {

        final Map<Long, String> parentMap = new HashMap<Long, String>();
        String query = "select id,name from EGASSET_ASSET_CATEGORY ";
        if (assetType != null && !assetType.equalsIgnoreCase("-1"))
            query = query + "where ASSET_TYPE = '" + assetType + "'";
        try {
            final List categoryList = persistenceService.getSession().createSQLQuery(query).list();

            if (categoryList != null && !categoryList.isEmpty()) {
                final Iterator assetCatIterator = categoryList.iterator();
                Object[] assetCategoryObject;
                while (assetCatIterator.hasNext()) {
                    assetCategoryObject = (Object[]) assetCatIterator.next();
                    parentMap.put(Long.valueOf(assetCategoryObject[0].toString()), assetCategoryObject[1].toString());
                }
            }
        } catch (final Exception e) {
            LOGGER.error("Exception in getParentMap() method:" + e.getMessage());
        }
        return parentMap;
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @Override
    public Object getModel() {
        return assetCategory;
    }

    public void setModel(final AssetCategory assetCategory) {
        this.assetCategory = assetCategory;
    }

    // Spring Injection
    public void setAssetCategoryService(final AssetCategoryService assetCategoryService) {
        this.assetCategoryService = assetCategoryService;
    }

    public List<AssetCategory> getAssetCategoryList() {
        return assetCategoryList;
    }

    public void setAssetCategoryList(final List<AssetCategory> assetCategoryList) {
        this.assetCategoryList = assetCategoryList;
    }

    public String getUserMode() {
        return userMode;
    }

    public void setUserMode(final String userMode) {
        this.userMode = userMode;
    }

    public boolean isFDisabled() {
        return fDisabled;
    }

    public boolean isSDisabled() {
        return sDisabled;
    }

    public String getDataDisplayStyle() {
        return dataDisplayStyle;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(final String assetType) {
        this.assetType = assetType;
    }

    public List<DepreciationMetaData> getDepMetaDatas() {
        return depMetaDatas;
    }

    public void setDepMetaDatas(final List<DepreciationMetaData> depMetaDatas) {
        this.depMetaDatas = depMetaDatas;
    }

    public void setAssetAccCodePURPOSEID(final String assetAccCodePURPOSEID) {
        this.assetAccCodePURPOSEID = assetAccCodePURPOSEID;
    }

    public void setRevResAccPURPOSEID(final String revResAccPURPOSEID) {
        this.revResAccPURPOSEID = revResAccPURPOSEID;
    }

    public void setDepExpAccPURPOSEID(final String depExpAccPURPOSEID) {
        this.depExpAccPURPOSEID = depExpAccPURPOSEID;
    }

    public void setAccDepPURPOSEID(final String accDepPURPOSEID) {
        this.accDepPURPOSEID = accDepPURPOSEID;
    }

    public void setAppService(final AppService appService) {
        this.appService = appService;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(final Long parentId) {
        this.parentId = parentId;
    }

    public String getIsAutoGeneratedCode() {
        return isAutoGeneratedCode;
    }

    public void setIsAutoGeneratedCode(final String isAutoGeneratedCode) {
        this.isAutoGeneratedCode = isAutoGeneratedCode;
    }

}
