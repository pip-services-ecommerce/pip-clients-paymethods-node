"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const CreditCardsDirectClientV1_1 = require("../version1/CreditCardsDirectClientV1");
const CreditCardsHttpClientV1_1 = require("../version1/CreditCardsHttpClientV1");
const CreditCardsLambdaClientV1_1 = require("../version1/CreditCardsLambdaClientV1");
class CreditCardsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(CreditCardsClientFactory.DirectClientV1Descriptor, CreditCardsDirectClientV1_1.CreditCardsDirectClientV1);
        this.registerAsType(CreditCardsClientFactory.HttpClientV1Descriptor, CreditCardsHttpClientV1_1.CreditCardsHttpClientV1);
        this.registerAsType(CreditCardsClientFactory.LambdaClientV1Descriptor, CreditCardsLambdaClientV1_1.CreditCardsLambdaClientV1);
    }
}
exports.CreditCardsClientFactory = CreditCardsClientFactory;
CreditCardsClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-creditcards', 'factory', 'default', 'default', '1.0');
CreditCardsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-creditcards', 'client', 'direct', 'default', '1.0');
CreditCardsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-creditcards', 'client', 'http', 'default', '1.0');
CreditCardsClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-creditcards', 'client', 'lambda', 'default', '1.0');
//# sourceMappingURL=CreditCardsClientFactory.js.map