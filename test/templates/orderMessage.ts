/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-10-11
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: payment email by order
 */

import { mcLabels, mcConstants } from "../../../mc-locale/config";
import { utils } from "../../../mc-utils/src";
import numFormat = require("numeral");

// Helper methods
const Locations: any = [];
const Products: any = [];
const order: any = {};
const orderCurrency = "usd";
const tradeParams: any = {};

function stateName(stateCode) {
    const state = Locations.find({_id: stateCode});
    return state ? state.locationName : '';
}

function countryName(countryCode) {
    const country = Locations.find({_id: countryCode});
    return country ? country.locationName : '';
}

function formatNum(num) {
    // return two decimal-place formatted numbers/currencies
    return numFormat(num).format('0,0.00');
}

function shortDesc(desc) {
    // set the short description for item.desc
    return utils.shortString(desc, mcConstants.getShortDesc());
}

function productName(itemId) {
    const product = Products.find({_id: itemId});
    return product ? product.productName : 'n/a';
}

function productCost(itemId) {
    const product = Products.find({_id: itemId});
    return product ? formatNum(product.productCost) : 'n/a';
}

const orderItems = [];

let orderItemsList = '';
orderItems.forEach(item => {
    const product = Products.findOne({_id: item.productId});
    orderItemsList += `
            <tr>
                <td>product-image</td>
                <td>
                    <b>${item.productName || productName(item.productId)}</b>
                    <br>
                    ${shortDesc(product.productDesc)}
                </td>
                <td>${productCost(item.productId)}</td>
                 <td>${item.productQty}}</td>
            </tr>
        `;
});

const message = `
                <div style="width: 100%">
                    <div style="width: 25%">
                        <h4>${mcLabels.shipAddress}</h4>
                        <p>${order.orderPayment.tradeShipAddress.contactName}</p>
                        <p>${order.orderPayment.tradeShipAddress.streetNumber} ${order.orderPayment.tradeShipAddress.streetName}</p>
                        <p>
                            ${order.orderPayment.tradeShipAddress.addressCity}, ${stateName(order.orderPayment.tradeShipAddress.addressState)}, ${order.orderPayment.tradeShipAddress.postalCode}</p>
                        <p>${countryName(order.orderPayment.tradeShipAddress.addressCountry)}</p>
                        <p>${mcLabels.phoneNumber}}: ${order.orderPayment.tradeShipAddress.contactPhone}</p>
                    </div>
                    <div style="width: 25%">
                        <h4>${mcLabels.payAddress}</h4>
                        <p>${order.orderPayment.tradePayAddress.contactName}</p>
                        <p>${order.orderPayment.tradePayAddress.streetNumber} ${order.orderPayment.tradePayAddress.streetName}</p>
                        <p>
                            ${order.orderPayment.tradePayAddress.addressCity}, ${stateName(order.orderPayment.tradePayAddress.addressState)}, ${order.orderPayment.tradePayAddress.postalCode}</p>
                        <p>${countryName(order.orderPayment.tradePayAddress.addressCountry)}</p>
                    </div>
                    <div style="width: 25%">
                        <h4>${mcLabels.payDetail}</h4>
                        <h5>[${order.orderPayment.tradePay}]</h5>
                        
                    </div>
                    <div style="width: 25%">
                        <div><h4>${mcLabels.orderSummary}</h4></div>
                        <div>
                            <span style="width: 66%"><b>${mcLabels.subTotal} (${order.orderItems.length} Item(s), ${orderCurrency} ${order.orderPayment.tradeCost}):</b></span>
                            <span style="width: 34%"><b>${orderCurrency}${order.orderPayment.tradeCost}</b></span>
                            <br>
                            <span style="width: 66%">${mcLabels.shipEst}:</span>
                            <span style="width: 34%">${orderCurrency}${order.orderPayment.tradeShipCost}</span>
                            <br>
                            <span style="width: 66%">${mcLabels.shipTax}:</span>
                            <span style="width: 34%">${orderCurrency}${order.orderPayment.tradeShipCostTax}</span>
                            <br>
                            <span style="width: 66%">${mcLabels.orderItem} Tax:</span>
                            <span style="width: 34%">${orderCurrency}${order.orderPayment.tradeCostTax}</span>
                            <br>
                            <span style="width: 66%">${mcLabels.orderBeforeTax}</span>
                            <span style="width: 34%">${orderCurrency}${order.orderPayment.tradeTotalCost}</span>
                            <br>
                            <span style="width: 66%">${mcLabels.orderTax} (${order.orderPayment.tradeTaxName || 'Sales Tax'}):</span>
                            <span style="width: 34%">${orderCurrency}${order.orderPayment.tradeTotalCostTax}</span>
                            <br>
                            <span style="width: 66%"><b>${mcLabels.orderTotalTax}:</b></span>
                            <span style="width: 34%"><b>${orderCurrency}${order.orderPayment.tradeCostTotalPlusTax}</b></span>
                            <br>
                        </div>
                    </div>
                </div>
                <hr>
                <div width="100%">
                    <table>
                        <thead>
                        <tr>
                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eee; border-right: 1px solid #eee;">${mcLabels.image}</th>
                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eee; border-right: 1px solid #eee;">${mcLabels.product}</th>
                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eee; border-right: 1px solid #eee;">${mcLabels.cost}</th>
                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eee; border-right: 1px solid #eee;">${mcLabels.quantity}</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${orderItemsList}
                        </tbody>
                    </table>
                </div>
    `;
