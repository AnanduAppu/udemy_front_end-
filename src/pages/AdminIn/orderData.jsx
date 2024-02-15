
import React, { useState, useContext } from 'react';
import Clintcontex from '../../createContex/Createcontex';
function OrderDetails() {
    const { DataStatus, setDataStatus } = useContext(Clintcontex);
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm m-4" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Order details</h3>
      </div>
      <div className="p-6">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="flex items-center gap-4">
            <div className="font-medium">Total Order</div>
            <div>{DataStatus.totalOrder}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-medium">total Revenue</div>
            <div>₹{DataStatus.totalProfit}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-medium">ordered Customers</div>
            <div></div>
          </div>
     
          {/* Add more order details here as needed */}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
