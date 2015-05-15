/*#-------------------------------------------------------------------------------
#  * eGov suite of products aim to improve the internal efficiency,transparency, 
#    accountability and the service delivery of the government  organizations.
# 
#     Copyright (C) <2015>  eGovernments Foundation
# 
#     The updated version of eGov suite of products as by eGovernments Foundation 
#     is available at http://www.egovernments.org
# 
#     This program is free software: you can redistribute it and/or modify
#     it under the terms of the GNU General Public License as published by
#     the Free Software Foundation, either version 3 of the License, or
#     any later version.
# 
#     This program is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU General Public License for more details.
# 
#     You should have received a copy of the GNU General Public License
#     along with this program. If not, see http://www.gnu.org/licenses/ or 
#     http://www.gnu.org/licenses/gpl.html .
# 
#     In addition to the terms of the GPL license to be adhered to in using this
#     program, the following additional terms are to be complied with:
# 
# 	1) All versions of this program, verbatim or modified must carry this 
# 	   Legal Notice.
# 
# 	2) Any misrepresentation of the origin of the material is prohibited. It 
# 	   is required that all modified versions of this material be marked in 
# 	   reasonable ways as different from the original version.
# 
# 	3) This license does not grant any rights to any user of the program 
# 	   with regards to rights under trademark law for use of the trade names 
# 	   or trademarks of eGovernments Foundation.
# 
#   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
#  
#-------------------------------------------------------------------------------*/
var gTopicInfo = [
	['Introduction', 'Topics/IDH_Topic10.htm'],
	['Introduction to eGov Property tax Information system', 'Topics/IDH_Topic20.htm'],
	['Disclaimer/Copyrights/Trademarks', 'Topics/IDH_Topic30.htm'],
	['Creating a New Property', 'Topics/IDH_Topic40.htm'],
	['Finding a Property', 'Topics/IDH_Topic50.htm'],
	['Change Location rate', 'Topics/IDH_Topic60.htm'],
	['Modification of Property', 'Topics/IDH_Topic70.htm'],
	['Change Property Address', 'Topics/IDH_Topic80.htm'],
	['Deactivate Property', 'Topics/IDH_Topic90.htm'],
	['Amalgamation of Property', 'Topics/IDH_Topic100.htm'],
	['Bifurcation of Property', 'Topics/IDH_Topic110.htm'],
	['Mutation', 'Topics/IDH_Topic120.htm']
];

var gAlphaIndex = [
	['0', 0, 1],
	['3', 2, 2],
	['4', 3, 4],
	['7', 5, 5],
	['a', 6, 52],
	['b', 53, 69],
	['c', 70, 118],
	['d', 119, 152],
	['e', 153, 182],
	['f', 183, 204],
	['g', 205, 212],
	['h', 213, 218],
	['i', 219, 232],
	['j', 233, 233],
	['k', 234, 237],
	['l', 238, 247],
	['m', 248, 274],
	['n', 275, 291],
	['o', 292, 318],
	['p', 319, 354],
	['r', 355, 383],
	['s', 384, 427],
	['t', 428, 457],
	['u', 458, 468],
	['v', 469, 473],
	['w', 474, 492],
	['y', 493, 496],
	['z', 497, 497]
];

var gWordList = [
	['0019', [8]],
	['029', [8]],
	['3rd', [3, 6, 9, 10]],
	['440', [3]],
	['440123', [3]],
	['74th', [1]],
	['about', [0, 1, 3]],
	['access', [1]],
	['accessable', [3, 6, 9, 10]],
	['according', [1]],
	['accordingly', [1]],
	['action', [1, 8]],
	['actions', [6, 7, 8, 9, 10, 11]],
	['add', [11]],
	['adding', [9]],
	['additional', [3]],
	['address', [3, 5, 6, 7, 9, 10, 11]],
	['adequate', [1]],
	['administration', [5]],
	['after', [1, 3, 6, 7, 9, 10]],
	['against', [8]],
	['age', [3, 6, 9, 10]],
	['agents', [2]],
	['allows', [1]],
	['also', [1, 3]],
	['alv', [3, 6, 9, 10]],
	['amalgamate', [9]],
	['amalgamated', [9]],
	['amalgamating', [0, 9]],
	['amalgamation', [1, 9]],
	['amendment', [1]],
	['amenities', [1, 3, 6, 9, 10]],
	['amount', [1]],
	['another', [0, 1]],
	['any', [1, 2, 4, 8, 9]],
	['apartment', [3]],
	['application', [1, 3, 6, 7, 8, 9, 10, 11]],
	['appropriate', [3, 6, 9, 10, 11]],
	['appropriately', [2]],
	['approval', [1]],
	['approve', [3, 6, 7, 8, 9, 10, 11]],
	['approved', [1]],
	['approving', [0]],
	['area', [1, 3, 4, 5, 6, 9, 10]],
	['arising', [2]],
	['assessor', [0, 3]],
	['assigned', [3]],
	['associated', [2]],
	['authorities', [3, 6, 7, 8, 9, 10, 11]],
	['automatically', [1, 9, 10]],
	['availability', [3]],
	['available', [3]],
	['away', [10]],
	['band', [1]],
	['bar', [3, 4, 5]],
	['basic', [1]],
	['because', [8]],
	['been', [2, 8]],
	['before', [1]],
	['being', [3]],
	['belongs', [3, 4, 5]],
	['best', [2]],
	['bifurcated', [0]],
	['bifurcating', [0, 10]],
	['bifurcation', [1, 10]],
	['bill', [4, 9]],
	['boundary', [9]],
	['bounded', [3, 5]],
	['brings', [1]],
	['building', [3, 6, 9, 10]],
	['calculation', [1]],
	['cannot', [3, 8]],
	['carry', [1]],
	['case', [8, 9, 10, 11]],
	['category', [3, 6, 9, 10]],
	['caused', [2]],
	['central', [3, 6, 9, 10]],
	['change', [1, 3, 5, 6, 7, 9, 10, 11]],
	['changed', [0]],
	['changes', [3, 6, 7, 8, 9, 10, 11]],
	['changing', [7]],
	['check', [3]],
	['citizen', [0, 1, 3]],
	['citizens', [1, 3]],
	['city', [1, 3]],
	['clerical', [6, 7]],
	['click', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['close', [3, 5, 6, 7, 8, 10, 11]],
	['code', [3]],
	['collect', [1]],
	['collection', [1]],
	['comes', [0]],
	['comment', [6, 7, 9, 10]],
	['comments', [6, 7, 8, 9, 10]],
	['commercial', [3, 6, 9, 10]],
	['common', [3, 9, 10]],
	['company', [2]],
	['complex', [1]],
	['computation', [1]],
	['computes', [1]],
	['confirm', [9]],
	['consent', [2]],
	['constitute', [2]],
	['constitution', [1]],
	['constructed', [3, 6, 9, 10]],
	['constructing', [3, 6, 9, 10]],
	['construction', [3, 6, 9, 10]],
	['copyrights', [2]],
	['corporation', [0, 1, 3]],
	['correct', [3, 6, 7]],
	['cost', [3, 6, 9, 10]],
	['court', [8, 11]],
	['create', [3]],
	['created', [0, 8, 9]],
	['creates', [1]],
	['creating', [0, 3]],
	['creation', [1, 3]],
	['cross', [3, 6, 9, 10]],
	['cycles', [1]],
	['damages', [2]],
	['data', [1]],
	['date', [4, 8, 11]],
	['deactivate', [8]],
	['deactivated', [8, 9]],
	['deactivates', [1]],
	['deactivating', [0, 8, 10]],
	['deactivation', [8]],
	['decrease', [1]],
	['deducting', [3, 6, 9, 10]],
	['delete', [3, 6, 9, 10]],
	['delivery', [1]],
	['demands', [1]],
	['depends', [1]],
	['description', [3, 5, 6, 9, 10, 11]],
	['designed', [1]],
	['details', [0, 1, 3, 4, 6, 7, 9, 10, 11]],
	['developed', [1]],
	['digits', [3]],
	['directors', [2]],
	['disclaimer', [2]],
	['discovers', [0, 1, 3]],
	['display', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['divide', [1, 10]],
	['divided', [10]],
	['dividing', [10]],
	['document', [2, 8, 11]],
	['does', [1]],
	['done', [1, 10]],
	['door', [4]],
	['down', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['drop', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['duplicate', [8]],
	['during', [0, 3]],
	['each', [0, 1, 3, 6, 9, 10]],
	['earlier', [1, 3]],
	['east', [3]],
	['easy', [1]],
	['edit', [5]],
	['effective', [1]],
	['effort', [1, 2]],
	['egov', [1]],
	['egovernments', [2]],
	['either', [3, 6, 9, 10]],
	['electronic', [2]],
	['email', [11]],
	['employees', [2]],
	['end', [3, 6, 9, 10]],
	['ensure', [1]],
	['ensures', [1]],
	['enter', [3, 4, 5, 6, 9, 10, 11]],
	['entered', [7]],
	['entry', [8]],
	['errors', [6, 7]],
	['every', [0, 1]],
	['exact', [1]],
	['exactly', [3]],
	['example', [3, 6, 8, 9, 10]],
	['exclusively', [1]],
	['exculpation', [2]],
	['exemption', [3]],
	['existing', [4, 10]],
	['exit', [3, 6, 7, 8, 10, 11]],
	['express', [2]],
	['factor', [3, 6, 9, 10]],
	['factors', [1]],
	['feature', [1]],
	['features', [1]],
	['fee', [11]],
	['few', [1]],
	['field', [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['fields', [3, 9, 10]],
	['financial', [2, 8]],
	['find', [4, 5, 6, 7, 8, 9, 10, 11]],
	['finding', [0, 3, 4]],
	['first', [2, 3]],
	['floor', [3, 6, 9, 10]],
	['floors', [3, 6, 9, 10]],
	['following', [0, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['foregoing', [2]],
	['form', [1, 2, 3, 9]],
	['format', [8]],
	['forward', [3, 6, 7, 8, 9, 10, 11]],
	['foundation', [2]],
	['from', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['functions', [1]],
	['general', [3, 6, 9, 10]],
	['generated', [1]],
	['get', [7, 9]],
	['gets', [3]],
	['given', [3, 6, 9, 10]],
	['gives', [1]],
	['government', [3, 6, 9, 10]],
	['guidelines', [2]],
	['happens', [1]],
	['health', [1]],
	['herein', [2]],
	['high', [3, 6, 7, 8, 9, 10, 11]],
	['house', [3, 4]],
	['however', [8]],
	['icon', [3, 6, 9, 10]],
	['includes', [10]],
	['increase', [1]],
	['index', [4]],
	['individual', [1, 9, 10]],
	['individuals', [10]],
	['inform', [3]],
	['information', [0, 1]],
	['informs', [0, 1]],
	['infrastructure', [1]],
	['injury', [2]],
	['institution', [1]],
	['integrity', [1]],
	['introduction', [0, 1]],
	['jurisdiction', [0]],
	['keeps', [1]],
	['key', [1]],
	['khasra', [3]],
	['known', [2]],
	['land', [3, 6, 9, 10]],
	['left', [3, 4, 5]],
	['legal', [2]],
	['liable', [2]],
	['list', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['little', [1]],
	['location', [1, 3, 4, 5, 6, 9, 10]],
	['logo', [2]],
	['logos', [2]],
	['loss', [2]],
	['mail', [3]],
	['maintained', [0]],
	['major', [1]],
	['make', [1, 7]],
	['manner', [1]],
	['manual', [3, 6, 9, 10]],
	['mauza', [3]],
	['may', [2, 6, 7]],
	['means', [2, 9]],
	['mechanical', [2]],
	['members', [2]],
	['mentioned', [2]],
	['merged', [0, 1]],
	['merging', [9]],
	['met', [1]],
	['method', [1]],
	['minimal', [1]],
	['mobile', [3, 4, 11]],
	['modification', [1, 6]],
	['modify', [6, 7]],
	['modifying', [6, 7, 10]],
	['more', [0, 1, 9, 10, 11]],
	['mowner', [11]],
	['mtrs', [3, 6, 9, 10]],
	['multiple', [0, 1, 3, 6, 9, 10]],
	['must', [0, 3, 10]],
	['mutation', [11]],
	['name', [3, 4, 6, 9, 10, 11]],
	['namely', [10]],
	['names', [2, 3, 11]],
	['navigation', [3, 4, 5]],
	['necessary', [6, 7]],
	['need', [0, 3, 6, 7, 9, 10]],
	['needs', [10]],
	['new', [0, 1, 3, 4, 6, 9, 10]],
	['newly', [3, 6, 9, 10]],
	['next', [9]],
	['no\'s', [9]],
	['non', [2]],
	['north', [3]],
	['not', [1, 2, 3]],
	['note', [3, 6, 7, 8, 9, 10, 11]],
	['notices', [1]],
	['number', [1, 3, 4, 6, 8, 9, 10, 11]],
	['objection', [4]],
	['obliged', [1]],
	['occasionally', [6, 7]],
	['occupancy', [1, 3, 6, 9, 10]],
	['occupied', [3, 6, 9, 10]],
	['occupier', [3, 6, 9, 10]],
	['occurrence', [2]],
	['office', [11]],
	['officer', [1]],
	['officers', [2]],
	['old', [1, 3, 4, 9]],
	['once', [3]],
	['one', [0, 1, 3, 4, 6, 8, 9, 10]],
	['only', [9]],
	['open', [3, 6, 9, 10]],
	['optimized', [1]],
	['options', [8]],
	['order', [1, 8, 11]],
	['organization', [2]],
	['original', [9, 10]],
	['other', [2]],
	['otherwise', [2]],
	['out', [1, 3, 6, 9, 10]],
	['overall', [1]],
	['owner', [0, 3, 4, 6, 7, 9, 10, 11]],
	['owners', [1, 2, 3]],
	['ownership', [0, 1]],
	['page', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['parcel', [3, 4]],
	['parent', [1]],
	['part', [2]],
	['particulars', [6, 7, 9, 10, 11]],
	['parts', [0, 10]],
	['pattern', [1]],
	['pending', [8]],
	['perform', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['performing', [1]],
	['permission', [2]],
	['person', [1]],
	['phone', [3]],
	['photocopying', [2]],
	['pincode', [3]],
	['plot', [3, 4, 6, 9, 10]],
	['plus', [3, 6, 9, 10, 11]],
	['population', [1]],
	['postal', [3]],
	['power', [1]],
	['print', [1]],
	['prior', [2]],
	['procedures', [1]],
	['process', [1]],
	['product', [2]],
	['profit', [2]],
	['proof', [6, 7]],
	['properties', [0, 1, 9, 10]],
	['property', [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['provide', [1]],
	['providing', [1]],
	['ptis', [1, 3]],
	['public', [1]],
	['publication', [2]],
	['publisher', [2]],
	['purpose', [3, 6, 9, 10]],
	['rate', [1, 3, 5, 6, 9, 10]],
	['read', [0]],
	['ready', [9]],
	['reason', [3, 6, 8, 11]],
	['receipt', [11]],
	['receiving', [6, 7]],
	['recognized', [2]],
	['recording', [2]],
	['reflected', [1]],
	['regarding', [8]],
	['register', [1, 3, 11]],
	['registered', [1, 2, 3, 4]],
	['registering', [6, 7, 10]],
	['related', [2, 3, 6, 9, 10]],
	['rent', [3, 6, 9, 10]],
	['reports', [1]],
	['reproduced', [2]],
	['request', [6, 7]],
	['require', [1]],
	['required', [1, 8]],
	['reserved', [2]],
	['residential', [3, 6, 9, 10]],
	['respective', [2, 3, 6, 9, 10]],
	['result', [1]],
	['results', [4]],
	['retrieval', [2]],
	['revenue', [1]],
	['revised', [5]],
	['rights', [1, 2]],
	['said', [2]],
	['sale', [11]],
	['same', [1]],
	['save', [5]],
	['schemas', [2]],
	['screen', [6, 7, 8, 10, 11]],
	['search', [4, 8]],
	['section', [3, 6, 9, 10]],
	['see', [3, 6, 9, 10]],
	['select', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['selected', [3, 6, 9, 10]],
	['selling', [11]],
	['sequence', [8]],
	['series', [1]],
	['service', [1]],
	['services', [1]],
	['shall', [2]],
	['share', [9]],
	['sheet', [3]],
	['significant', [1]],
	['similarly', [3, 6, 9, 10]],
	['simple', [1]],
	['single', [1, 9]],
	['situation', [9]],
	['source', [1]],
	['south', [3]],
	['specifications', [2]],
	['specify', [1, 3, 6, 9, 10]],
	['state', [3, 6, 9, 10]],
	['status', [1, 9]],
	['steps', [1, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['stored', [2]],
	['structural', [3, 6, 9, 10]],
	['sub', [11]],
	['submit', [5]],
	['submitted', [3]],
	['substantial', [1]],
	['such', [1, 6, 7, 9]],
	['supervision', [1]],
	['supply', [1]],
	['sure', [1]],
	['survey', [0, 3]],
	['symbol', [11]],
	['system', [0, 1, 2, 3, 8, 10]],
	['table', [3, 5, 6, 9, 10, 11]],
	['tabular', [1]],
	['task', [1]],
	['tasks', [10]],
	['tax', [1, 3, 4, 5]],
	['teh', [4]],
	['term', [2]],
	['terms', [1, 2]],
	['their', [2, 3]],
	['then', [9, 10]],
	['there', [6, 7, 8]],
	['therefore', [1]],
	['these', [1, 9]],
	['this', [1, 2, 3, 6, 9, 10]],
	['three', [3]],
	['time', [1]],
	['timely', [1]],
	['together', [0]],
	['topics', [0]],
	['total', [3, 6, 9, 10]],
	['track', [1]],
	['trademarks', [2]],
	['transfer', [1]],
	['transferred', [1]],
	['transferring', [0]],
	['transmitted', [2]],
	['transparency', [1]],
	['two', [0, 1, 9, 10]],
	['type', [1, 3, 4, 6, 7, 8, 9, 10]],
	['typed', [6, 7]],
	['unassessed', [3]],
	['under', [0]],
	['undergoes', [1]],
	['update', [0, 1]],
	['updated', [0]],
	['upload', [8]],
	['urban', [1]],
	['usage', [3, 6, 9, 10]],
	['use', [2]],
	['used', [3, 6, 9, 10]],
	['using', [1, 4]],
	['valuation', [1]],
	['various', [1]],
	['very', [1]],
	['vested', [1]],
	['view', [8]],
	['want', [5, 6, 7, 8, 9, 10, 11]],
	['wants', [1]],
	['ward', [3, 4, 5, 8]],
	['was', [3]],
	['water', [1, 3, 6, 9, 10]],
	['well', [0, 2]],
	['were', [7]],
	['west', [3]],
	['when', [0, 1, 3, 8]],
	['which', [3, 4, 5, 6, 7, 8, 9, 10, 11]],
	['while', [6, 7, 9, 10]],
	['who', [3, 6, 9, 10]],
	['will', [1]],
	['window', [3]],
	['without', [2]],
	['workflow', [3]],
	['written', [2]],
	['wrong', [3, 8]],
	['wrongly', [8]],
	['year', [8]],
	['yet', [3]],
	['yield', [1]],
	['your', [2]],
	['zone', [3, 4, 5, 8]]
];
