let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { PagingParams } from 'pip-services3-commons-node';

import { CreditCardV1 } from '../../src/version1/CreditCardV1';
import { CreditCardTypeV1 } from '../../src/version1/CreditCardTypeV1';
import { CreditCardStateV1 } from '../../src/version1/CreditCardStateV1';
import { ICreditCardsClientV1 } from '../../src/version1/ICreditCardsClientV1';

let CREDIT_CARD1: CreditCardV1 = {
    id: '1',
    customer_id: '1',
    type: CreditCardTypeV1.Visa,
    number: '1111111111111111',
    expire_month: 1,
    expire_year: 2021,
    first_name: 'Bill',
    last_name: 'Gates',
    billing_address: {
        line1: '2345 Swan Rd',
        city: 'Tucson',
        zip: '85710',
        country_code: 'US'
    },
    cvc: '213',
    name: 'Test Card 1',
    saved: true,
    default: true,
    state: CreditCardStateV1.Ok
};
let CREDIT_CARD2: CreditCardV1 = {
    id: '2',
    customer_id: '1',
    type: CreditCardTypeV1.Visa,
    number: '2222222222222222',
    expire_month: 4,
    expire_year: 2028,
    first_name: 'Joe',
    last_name: 'Dow',
    billing_address: {
        line1: '123 Broadway Blvd',
        city: 'New York',
        zip: '123001',
        country_code: 'US'
    },
    name: 'Test Card 2',
    saved: true,
    default: false,
    state: CreditCardStateV1.Expired
};

export class CreditCardsClientFixtureV1 {
    private _client: ICreditCardsClientV1;
    
    constructor(client: ICreditCardsClientV1) {
        this._client = client;
    }
        
    testCrudOperations(done) {
        let creditCard1, creditCard2: CreditCardV1;

        async.series([
        // Create one credit_card
            (callback) => {
                this._client.createCreditCard(
                    null,
                    CREDIT_CARD1,
                    (err, creditCard) => {
                        assert.isNull(err);

                        assert.isObject(creditCard);
                        assert.equal(creditCard.number, CREDIT_CARD1.number);
                        assert.equal(creditCard.expire_year, CREDIT_CARD1.expire_year);
                        assert.equal(creditCard.customer_id, CREDIT_CARD1.customer_id);

                        creditCard1 = creditCard;

                        callback();
                    }
                );
            },
        // Create another credit_card
            (callback) => {
                this._client.createCreditCard(
                    null,
                    CREDIT_CARD2,
                    (err, creditCard) => {
                        assert.isNull(err);

                        assert.isObject(creditCard);
                        assert.equal(creditCard.number, CREDIT_CARD2.number);
                        assert.equal(creditCard.expire_year, CREDIT_CARD2.expire_year);
                        assert.equal(creditCard.customer_id, CREDIT_CARD2.customer_id);

                        creditCard2 = creditCard;

                        callback();
                    }
                );
            },
        // Get all credit_cards
            (callback) => {
                this._client.getCreditCards(
                    null,
                    null,
                    new PagingParams(0,5,false),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.isTrue(page.data.length >= 2);

                        callback();
                    }
                );
            },
        // Update the credit_card
            (callback) => {
                creditCard1.name = 'Updated Card 1';

                this._client.updateCreditCard(
                    null,
                    creditCard1,
                    (err, creditCard) => {
                        assert.isNull(err);

                        assert.isObject(creditCard);
                        assert.equal(creditCard.name, 'Updated Card 1');
                        assert.equal(creditCard.id, CREDIT_CARD1.id);

                        creditCard1 = creditCard;

                        callback();
                    }
                );
            },
        // Delete credit_card
            (callback) => {
                this._client.deleteCreditCardById(
                    null,
                    creditCard1.id,
                    creditCard1.customer_id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete credit_card
            (callback) => {
                this._client.getCreditCardById(
                    null,
                    creditCard1.id,
                    creditCard1.customer_id,
                    (err, creditCard) => {
                        assert.isNull(err);
                        
                        assert.isNull(creditCard || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
