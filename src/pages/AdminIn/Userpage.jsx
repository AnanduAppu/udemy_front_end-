import React from 'react';
import Clintcontex from "../../createContex/Createcontex";
import { useState,useContext } from 'react';
function Userpage() {
  const {DataStatus,setDataStatus} = useContext(Clintcontex);
  console.log(DataStatus)
  return (
    <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6  ">
      <div className="rounded-lg border  text-card-foreground shadow-sm" data-v0-t="card">
        <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm border border-black ">
                <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 max-w-[150px]">ind</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 max-w-[150px]">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Email</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[120px]">Total Orders</th>
                    </tr>
                </thead>
                {DataStatus.userData.map((ele,ind)=>(

                  <tbody className="[&amp;_tr:last-child]:border-0" key={ind}>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"><div className="font-medium">{ind+1}</div></td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"><div className="font-medium">{ele.name}</div></td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ele.email}</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ele.orders.length}</td>
                  </tr>
                  </tbody>

                ))}
            
            </table>
        </div>
      </div>
    </main>
  );
}

export default Userpage;
