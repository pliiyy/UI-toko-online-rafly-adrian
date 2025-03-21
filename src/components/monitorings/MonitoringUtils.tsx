"use client";
import { DatePicker, Input, Table, TableProps, Typography } from "antd";
import moment from "moment";
import { IDRFormat } from "../utils/FunctionUtils";
import { ViewArchive, CreateAkad } from "../utils";
const { RangePicker } = DatePicker;
const { Paragraph } = Typography;

export const UI = () => {
  return (
    <div className="p-1 bg-gray-50 border w-full">
      <TableMonitoring />
    </div>
  );
};

export const TableMonitoring = () => {
  const columns: TableProps["columns"] = [
    {
      title: "NO",
      dataIndex: "no",
      key: "no",
      width: 30,
      className: "text-xs",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            fontSize: 12,
          },
        };
      },
      render(value, record, index) {
        return <div className="text-center">{index + 1}</div>;
      },
    },
    {
      title: "NAMA PEMOHON",
      dataIndex: "namaPemohon",
      key: "namaPemohon",
      className: "text-xs",
      width: 200,
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
      title: "NOMOR NIK",
      dataIndex: "nik",
      key: "nik",
      className: "text-xs",
      width: 150,
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
      title: "PRODUK PEMBIAYAAN",
      dataIndex: "produk",
      key: "produk",
      className: "text-xs",
      width: 130,
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
      title: "JENIS PEMBIAYAAN",
      dataIndex: "jenis",
      key: "jenis",
      className: "text-xs",
      width: 120,
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
      title: "PLAFOND",
      dataIndex: "plafond",
      key: "plafond",
      width: 130,
      className: "text-right text-xs",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            fontSize: 12,
          },
        };
      },
      sorter: (a: any, b: any) => a.plafond - b.plafond,
      render(value, record, index) {
        return <div>{IDRFormat(value)}</div>;
      },
    },
    {
      title: "TENOR",
      dataIndex: "tenor",
      key: "tenor",
      width: 80,
      className: "text-center text-xs",
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
      title: "TGL PENGAJUAN",
      dataIndex: "tanggalPengajuan",
      key: "tanggalPengajuan",
      width: 100,
      className: "text-center text-xs",
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
      title: "AKAD KREDIT",
      dataIndex: "akad",
      className: "text-xs",
      key: "akad",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            background: "oklch(0.795 0.184 86.047)",
            color: "oklch(0.967 0.003 264.542)",
            fontSize: 12,
          },
        };
      },
      children: [
        {
          title: "CETAK",
          dataIndex: "cetakAkad",
          key: "cetakAkad",
          className: "text-xs",
          width: 80,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.795 0.184 86.047)",
                color: "oklch(0.967 0.003 264.542)",
                fontSize: 12,
              },
            };
          },
          render(value, record, index) {
            return (
              <div className="flex justify-center gap-1">
                <CreateAkad title={record.namaPemohon.toUpperCase()} />
                <ViewArchive
                  src={record.berkasAkad}
                  title={"Berkas Akad " + record.namaPemohon.toUpperCase()}
                />
              </div>
            );
          },
        },
        {
          title: "TANGGAL",
          dataIndex: "tanggalAkad",
          key: "tanggalAkad",
          className: "text-xs",
          width: 100,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.795 0.184 86.047)",
                color: "oklch(0.967 0.003 264.542)",
                fontSize: 12,
              },
            };
          },
        },
      ],
    },
    {
      title: "STATUS PENGAJUAN",
      dataIndex: "statusPengajuan",
      key: "statusPengajuan",
      className: "text-xs",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            background: "oklch(0.685 0.169 237.323)",
            color: "oklch(0.967 0.003 264.542)",
            fontSize: 12,
          },
        };
      },
      children: [
        {
          title: "STATUS",
          dataIndex: "statusApproval",
          key: "statusApproval",
          className: "text-xs text-center",
          width: 100,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.685 0.169 237.323)",
                color: "oklch(0.967 0.003 264.542)",
                fontSize: 12,
              },
            };
          },
        },
        {
          title: "KETERANGAN",
          dataIndex: "ketApproval",
          key: "ketApproval",
          className: "text-xs",
          width: 150,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.685 0.169 237.323)",
                color: "oklch(0.967 0.003 264.542)",
                fontSize: 12,
              },
            };
          },
          render(value, record, index) {
            return (
              <Paragraph
                ellipsis={{
                  rows: 2,
                  expandable: "collapsible",
                }}
                className="text-xs"
              >
                {record.ketApproval}
              </Paragraph>
            );
          },
        },
        {
          title: "TANGGAL",
          dataIndex: "tanggalApproval",
          key: "tanggalApproval",
          className: "text-xs",
          width: 100,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.685 0.169 237.323)",
                color: "oklch(0.967 0.003 264.542)",
                fontSize: 12,
              },
            };
          },
        },
      ],
    },
    {
      title: "STATUS PENCAIRAN",
      dataIndex: "statusPencairan",
      key: "statusPencairan",
      className: "text-xs text-center",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            background: "oklch(0.723 0.219 149.579)",
            color: "oklch(0.967 0.003 264.542)",
            fontSize: 12,
          },
        };
      },
      children: [
        {
          title: "STATUS",
          dataIndex: "statusPencairan",
          key: "statusPencairan",
          className: "text-xs text-center",
          width: 100,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.723 0.219 149.579)",
                color: "oklch(0.967 0.003 264.542)",
                fontSize: 12,
              },
            };
          },
        },
        {
          title: "TANGGAL ",
          dataIndex: "tanggalPencairan",
          key: "tanggalPencairan",
          className: "text-xs",
          width: 100,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.723 0.219 149.579)",
                color: "oklch(0.967 0.003 264.542)",
                fontSize: 12,
              },
            };
          },
        },
      ],
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        bordered
        dataSource={tempData}
        scroll={{ x: "max-content", y: 370 }}
        pagination={{
          size: "small",
          pageSizeOptions: [20, 50, 100, 500, 1000, 10000],
          defaultPageSize: 50,
        }}
        title={() => (
          <div>
            <div className="font-bold text-xl text-green-500 border-b">
              Monitoring
            </div>
            <div className="py-1 flex flex-col sm:flex-row gap-2 justify-between sm:items-end">
              <div className="flex-1 flex items-end gap-2 flex-wrap">
                <RangePicker size="small" />
              </div>
              <div className="flex-2">
                <Input.Search placeholder="search" size="small" />
              </div>
            </div>
          </div>
        )}
        summary={(pageData) => {
          let plafond = 0;

          pageData.forEach((pd, i) => {
            plafond += pd.plafond;
          });
          return (
            <Table.Summary.Row className="bg-green-500 text-white text-center">
              <Table.Summary.Cell index={1} className="text-center">
                Summary
                <></>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
              <Table.Summary.Cell index={4}></Table.Summary.Cell>
              <Table.Summary.Cell index={5}></Table.Summary.Cell>
              <Table.Summary.Cell index={6} className="text-right">
                {IDRFormat(plafond)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={7}></Table.Summary.Cell>
              <Table.Summary.Cell index={8}></Table.Summary.Cell>
              <Table.Summary.Cell index={9}></Table.Summary.Cell>
              <Table.Summary.Cell index={10}></Table.Summary.Cell>
              <Table.Summary.Cell index={11}></Table.Summary.Cell>
              <Table.Summary.Cell index={12}></Table.Summary.Cell>
              <Table.Summary.Cell index={13}></Table.Summary.Cell>
              <Table.Summary.Cell index={14}></Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

const tempData = [
  {
    key: 1,
    namaPemohon: "Syihabudin Tsani",
    nik: "3204251108010006",
    produk: "Experience",
    jenis: "Baru",
    plafond: 5000000,
    tenor: 10,
    tanggalPengajuan: moment().format("DD/MM/YYYY"),
    tanggalAkad: moment().format("DD/MM/YYYY"),
    berkasAkad:
      "https://sipboss.kpfi.co.id/akad/200021016170_RATIYEM_19032025.pdf",
    statusApproval: "PENDING",
    tanggalApproval: moment().format("DD/MM/YYYY"),
    ketApproval: "Oke Lanjut Proses",
    statusPencairan: "TRANSFER",
    tanggalPencairan: moment().format("DD/MM/YYYY"),
  },
  {
    key: 2,
    namaPemohon: "Tsani Syihabudin",
    nik: "3204251108010006",
    produk: "Experience",
    jenis: "Baru",
    plafond: 5000000,
    tenor: 10,
    tanggalPengajuan: moment().format("DD/MM/YYYY"),
    tanggalAkad: moment().format("DD/MM/YYYY"),
    berkasAkad:
      "https://sipboss.kpfi.co.id/akad/48003005600_SAPINI_21102024.pdf",
    statusApproval: "PENDING",
    tanggalApproval: moment().format("DD/MM/YYYY"),
    ketApproval: "Oke Lanjut Proses",
    statusPencairan: "TRANSFER",
    tanggalPencairan: moment().format("DD/MM/YYYY"),
  },
  {
    key: 3,
    namaPemohon: "Video Tsani",
    nik: "3204251108010006",
    produk: "Experience",
    jenis: "Baru",
    plafond: 5000000,
    tenor: 10,
    tanggalPengajuan: moment().format("DD/MM/YYYY"),
    tanggalAkad: moment().format("DD/MM/YYYY"),
    berkasAkad:
      "https://sipboss.kpfi.co.id/wawancara/WAWANCARA_1742285268176.mp4",
    statusApproval: "PENDING",
    tanggalApproval: moment().format("DD/MM/YYYY"),
    ketApproval: "Oke Lanjut Proses",
    statusPencairan: "TRANSFER",
    tanggalPencairan: moment().format("DD/MM/YYYY"),
  },
];
