"use client";

import { ArrowLeftOutlined, ArrowUpOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export const UI = () => {
  return (
    <div>
      <div className="font-bold text-xl my-2">
        <p>Standar Operating Procedure (SOP) / FAQ</p>
      </div>
      <div className="mt-5">
        {dataSOP.map((d, i) => (
          <div key={i}>
            <Item data={d} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Item = ({
  data,
}: {
  data: { title: string; desc: string | React.ReactNode };
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded cursor-pointer">
      <div
        className="bg-gray-200 p-2 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <p className="font-bold">{data.title}</p>
        {open ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}
      </div>
      {open && (
        <div
          className="text-xs py-2 ps-6 pe-4 bg-gray-100"
          style={{ lineHeight: 2 }}
        >
          {data.desc}
        </div>
      )}
    </div>
  );
};

const dataSOP: { title: string; desc: string | React.ReactNode }[] = [
  {
    title: "Simulasi",
    desc: (
      <div className="text-justify">
        <p>
          Dalam sistem ini ada 3 simulasi kredit yang dapat digunakan, simulasi
          kredit harian, mingguan, dan bulanan. Gunakanlah simulasi yang sesuai
          dengan kebutuhan kredit pemohon.
        </p>
        <p>
          Untuk simulasi deviasi hanya dapat dilakukan oleh Tim Pusat. Apabila
          admin meminta simulasi deviasi, mohon kontak Tim Pusat dengan
          informasi nasabah dan simulasi awal sebelum deviasi
        </p>
      </div>
    ),
  },
];
