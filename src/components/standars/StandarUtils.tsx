"use client";

import {
  ArrowRightOutlined,
  ArrowUpOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import moment from "moment";
import React, { useState } from "react";

export const UI = () => {
  return (
    <div>
      <div className="font-bold text-xl my-2">
        <p>Standar Operating Procedure (SOP) / FAQ</p>
      </div>
      <div className="mt-5">
        {dataSOP.map((d, i) => (
          <div key={i} className="border rounded my-1">
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
    <div className="rounded cursor-pointer">
      <div
        className="bg-gray-100 hover:bg-gray-200 p-2 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <p className="font-bold">{data.title}</p>
        {open ? <ArrowUpOutlined /> : <DoubleLeftOutlined />}
      </div>
      {open && (
        <div
          className="text-xs py-2 ps-6 pe-4 bg-gray-50"
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
          mengirimkan data nasabah, keterangan deviasi, dan simulasi awal
          sebelum deviasi
        </p>
      </div>
    ),
  },
  {
    title: "Syarat - Syarat Pengajuan",
    desc: (
      <ul>
        <li>
          <div className="flex gap-2 font-bold italic">
            <ArrowRightOutlined />
            <p>Berkas Pengajuan</p>
          </div>
          <div className="ms-8">
            <p>
              Berkas pengajuan harus berisi setidaknya KTP, KK, Surat Kawin dan
              Formulir Pengajuan.
            </p>
            <div className="italic flex gap-4 mt-2">
              <p className="font-bold">Note : </p>
              <p>
                Setiap formulir yang memiliki bagian tandatangan harus diisi
                Nama dan Tanggal pengisian formulir
              </p>
            </div>
          </div>
        </li>
        <li>
          <div className="flex gap-2 font-bold italic">
            <ArrowRightOutlined />
            <p>Video Wawancara</p>
          </div>
          <div className="ms-8">
            <p>
              Video wawancara harus berisi Tanggal Wawancara, Nama Pemohon,
              Alamat Pemohon, Plafon Pinjaman, Jangka Waktu dan Kepada siapa
              mengajukan pinjaman.
            </p>
            <p className="italic font-bold">Contoh:</p>
            <p>Pada hari ini tanggal {moment().format("DD/MM/YYYY")}</p>
            <Table
              columns={[
                {
                  title: "PERTANYAAN",
                  dataIndex: "question",
                  className: "text-xs",
                  key: "question",
                  onHeaderCell: () => {
                    return {
                      ["style"]: {
                        textAlign: "center",
                        fontSize: 12,
                      },
                    };
                  },
                },
                {
                  title: "JAWABAN",
                  dataIndex: "answer",
                  className: "text-xs",
                  key: "answer",
                  onHeaderCell: () => {
                    return {
                      ["style"]: {
                        textAlign: "center",
                        fontSize: 12,
                      },
                    };
                  },
                },
              ]}
              size="small"
              bordered
              scroll={{ x: "max-content" }}
              dataSource={[
                {
                  question: "Nama Bapak/Ibu siapa?",
                  answer: "Asep Kusnawan",
                  key: 1,
                },
                {
                  question: "Alamat Bapak/Ibu dimana?",
                  answer:
                    "Kp. Ciheulang RT 02 RW 04, Desa Cicurug Kecamatan Garut, Kabupaten Bandung Jawa Barat",
                  key: 2,
                },
                {
                  question: "Mengajukan pinjaman kemana?",
                  answer: "KOPJAS Fadillah",
                  key: 3,
                },
                {
                  question: "Jumlah pinjamannya berapa?",
                  answer: "9.000.000",
                  key: 4,
                },
                {
                  question: "Dengan Jangka Waktu berapa lama?",
                  answer: "10 Minggu",
                  key: 5,
                },
              ]}
            />
          </div>
        </li>
      </ul>
    ),
  },
  {
    title: "Akad Kredit",
    desc: (
      <div>
        <p>
          Akad kredit harus dilakukan di rumah debitur yang dilaksanakan oleh
          debitur dengan tim dari KOPJAS FAS (tidak bisa diwakilkan). Tim KOPJAS
          FAS yang melaksanakan akad diwajibkan untuk mengambil foro debitur
          ketika mengisi tanda tangan di bagian Perjanjian Kredit (PK).
        </p>
        <div className="italic mt-2 flex gap-4">
          <p className="font-bold">Note :</p>
          <p>
            Setiap formulir yang memiliki bagian tandatangan harus diisi Nama
            dan Tanggal pengisian formulir
          </p>
        </div>
      </div>
    ),
  },
  { title: "Bukti - Bukti Pencairan", desc: "" },
  { title: "Angsuran", desc: "" },
];
