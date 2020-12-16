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
    <div>
                <div class="w3-container">
                    <div class="col-sm-3">
                        <h4>${mcLabels.shipAddress}</h4>
                        <p>${order.orderPayment.tradeShipAddress.contactName}</p>
                        <p>${order.orderPayment.tradeShipAddress.streetNumber} ${order.orderPayment.tradeShipAddress.streetName}</p>
                        <p>
                            ${order.orderPayment.tradeShipAddress.addressCity}, ${stateName(order.orderPayment.tradeShipAddress.addressState)}, ${order.orderPayment.tradeShipAddress.postalCode}</p>
                        <p>${countryName(order.orderPayment.tradeShipAddress.addressCountry)}</p>
                        <p>${mcLabels.phoneNumber}}: ${order.orderPayment.tradeShipAddress.contactPhone}</p>
                    </div>
                    <div class="col-sm-3">
                        <h4>${mcLabels.payAddress}</h4>
                        <p>${order.orderPayment.tradePayAddress.contactName}</p>
                        <p>${order.orderPayment.tradePayAddress.streetNumber} ${order.orderPayment.tradePayAddress.streetName}</p>
                        <p>
                            ${order.orderPayment.tradePayAddress.addressCity}, ${stateName(order.orderPayment.tradePayAddress.addressState)}, ${order.orderPayment.tradePayAddress.postalCode}</p>
                        <p>${countryName(order.orderPayment.tradePayAddress.addressCountry)}</p>
                    </div>
                    <div class="col-sm-3">
                        <h4>${mcLabels.payDetail}</h4>
                        <h5>[${order.orderPayment.tradePay}]</h5>
                        
                    </div>
                    <div class="col-sm-3">
                        <div><h4>${mcLabels.orderSummary}</h4></div>
                        <div>
                            <span class="col-sm-8"><b>${mcLabels.subTotal} (${order.orderItems.length} ${orderCurrency} ${order.orderPayment.tradeCost}):</b></span>
                            <span class="col-sm-4"><b>${orderCurrency}${order.orderPayment.tradeCost}</b></span>
                            <br>
                            <span class="col-sm-8">${mcLabels.shipEst}:</span>
                            <span class="col-sm-4">${orderCurrency}${order.orderPayment.tradeShipCost}</span>
                            <br>
                            <span class="col-sm-8">${mcLabels.shipTax}:</span>
                            <span class="col-sm-4">${orderCurrency}${order.orderPayment.tradeShipCostTax}</span>
                            <br>
                            <span class="col-sm-8">${mcLabels.orderItem} Tax:</span>
                            <span class="col-sm-4">${orderCurrency}${order.orderPayment.tradeCostTax}</span>
                            <br>
                            <span class="col-sm-8">Order before Tax:</span>
                            <span class="col-sm-4">${orderCurrency}${order.orderPayment.tradeTotalCost}</span>
                            <br>
                            <span class="col-sm-8">${mcLabels.orderTax} (${tradeParams.tradeTaxName}):</span>
                            <span class="col-sm-4">${orderCurrency}${order.orderPayment.tradeTotalCostTax}</span>
                            <br>
                            <span class="col-sm-8"><b>${mcLabels.orderTotalTax}:</b></span>
                            <span class="col-sm-4"><b>${orderCurrency}${order.orderPayment.tradeCostTotalPlusTax}</b></span>
                            <br>
                        </div>
                        <hr>
                        <div>
                            <button class="btn btn-primary">
                                ${mcLabels.payOrder}
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="w3-container">
                    <div class="col-sm-2"><h4>${mcLabels.tradeItems}</h4></div>
                    <div class="col-sm-4">
                        <button class="btn btn-primary">
                            ${mcLabels.tradeUpdate}
                        </button>
                    </div>
                </div>
                <div>
                    <table class="w3-table w3-striped w3-border w3-hoverable" id="mcOrderCartItems">
                        <thead>
                        <tr class="w3-red">
                            <th scope="col">${mcLabels.product}</th>
                            <th scope="col">${mcLabels.cost}</th>
                            <th scope="col">${mcLabels.quantity}</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${orderItemsList}
                        </tbody>
                    </table>
                </div>
            </div>
    `;
