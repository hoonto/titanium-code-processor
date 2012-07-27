/**
 * <p>Copyright (c) 2012 by Appcelerator, Inc. All Rights Reserved.
 * Please see the LICENSE file for information about licensing.</p>
 * 
 * @author Bryan Hughes &lt;<a href="mailto:bhughes@appcelerator.com">bhughes@appcelerator.com</a>&gt;
 */

var path = require("path"),
	RuleProcessor = require("../RuleProcessor"),
	Base = require("../Base");

exports.processRule = function(ast) {
	RuleProcessor.fireRuleEvent(ast, {});
	
	var children = ast[1],
		i = 0,
		len = children.length;
	for(; i < len; i++) {
		if (children[i][1]) {
			Base.putValue(children[i][0], Base.getValue(RuleProcessor.processRule(children[i][1])));
		}
	}
	
	return ["normal", undefined, undefined];
};
RuleProcessor.registerRuleProcessor(path.basename(__filename, ".js"), exports);