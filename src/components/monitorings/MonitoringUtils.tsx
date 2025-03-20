"use client";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, DatePicker, Input, Table, TableProps, Typography } from "antd";
import moment from "moment";
import { IDRFormat } from "../Utils";
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
      width: 50,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
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
      width: 200,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "NOMOR NIK",
      dataIndex: "nik",
      key: "nik",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "PRODUK PEMBIAYAAN",
      dataIndex: "produk",
      key: "produk",
      width: 150,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "JENIS PEMBIAYAAN",
      dataIndex: "jenis",
      key: "jenis",
      width: 120,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "PLAFOND",
      dataIndex: "plafond",
      key: "plafond",
      width: 150,
      className: "text-right",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
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
      width: 100,
      className: "text-center",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
          },
        };
      },
    },
    {
      title: "TANGGAL PENGAJUAUN",
      dataIndex: "tanggal",
      key: "tanggal",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            background: "oklch(0.795 0.184 86.047)",
            color: "oklch(0.967 0.003 264.542)",
          },
        };
      },
      children: [
        {
          title: "TANGGAL INPUT",
          dataIndex: "tanggalPengajuan",
          key: "tanggalPengajuan",
          width: 130,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.795 0.184 86.047)",
                color: "oklch(0.967 0.003 264.542)",
              },
            };
          },
        },
        {
          title: "TANGGAL AKAD",
          dataIndex: "tanggalAkad",
          key: "tanggalAkad",
          width: 130,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.795 0.184 86.047)",
                color: "oklch(0.967 0.003 264.542)",
              },
            };
          },
        },
      ],
    },
    {
      title: "STATUS PENGAJUAUN",
      dataIndex: "statusPengajuan",
      key: "statusPengajuan",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            background: "oklch(0.645 0.246 16.439)",
            color: "oklch(0.967 0.003 264.542)",
          },
        };
      },
      children: [
        {
          title: "STATUS VERIF",
          dataIndex: "statusVerifikasi",
          key: "statusVerifikasi",
          className: "text-center",
          width: 130,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.645 0.246 16.439)",
                color: "oklch(0.967 0.003 264.542)",
              },
            };
          },
        },
        {
          title: "STATUS APPROV",
          dataIndex: "statusApproval",
          key: "statusApproval",
          className: "text-center",
          width: 130,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.645 0.246 16.439)",
                color: "oklch(0.967 0.003 264.542)",
              },
            };
          },
        },
      ],
    },
    {
      title: "KETERANGAN PENGAJUAN",
      dataIndex: "statusPengajuan",
      key: "statusPengajuan",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            background: "oklch(0.685 0.169 237.323)",
            color: "oklch(0.967 0.003 264.542)",
          },
        };
      },
      children: [
        {
          title: "KET. VERIFIKASI",
          dataIndex: "ketVerifikasi",
          key: "ketVerifikasi",
          width: 200,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.685 0.169 237.323)",
                color: "oklch(0.967 0.003 264.542)",
              },
            };
          },
          render(value, record, index) {
            return (
              <Paragraph
                ellipsis={{
                  rows: 1,
                  expandable: "collapsible",
                }}
              >
                {record.ketVerifikasi}
              </Paragraph>
            );
          },
        },
        {
          title: "KET. APPROVAL",
          dataIndex: "ketApproval",
          key: "ketApproval",
          width: 200,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.685 0.169 237.323)",
                color: "oklch(0.967 0.003 264.542)",
              },
            };
          },
          render(value, record, index) {
            return (
              <Paragraph
                ellipsis={{
                  rows: 1,
                  expandable: "collapsible",
                }}
              >
                {record.ketApproval}
              </Paragraph>
            );
          },
        },
      ],
    },
    {
      title: "STATUS PENCAIRAN",
      dataIndex: "statusPencairan",
      key: "statusPencairan",
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            background: "oklch(0.723 0.219 149.579)",
            color: "oklch(0.967 0.003 264.542)",
          },
        };
      },
      children: [
        {
          title: "TANGGAL ",
          dataIndex: "tanggalPencairan",
          key: "tanggalPencairan",
          width: 100,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.723 0.219 149.579)",
                color: "oklch(0.967 0.003 264.542)",
              },
            };
          },
        },
        {
          title: "STATUS",
          dataIndex: "statusPencairan",
          key: "statusPencairan",
          width: 120,
          onHeaderCell: () => {
            return {
              ["style"]: {
                textAlign: "center",
                background: "oklch(0.723 0.219 149.579)",
                color: "oklch(0.967 0.003 264.542)",
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
                <Button className="bg-green-500 text-white" size="small">
                  <PlusCircleFilled /> New
                </Button>
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
              <Table.Summary.Cell index={6}>
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
              <Table.Summary.Cell index={15}></Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

const tempData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
].map((d) => {
  return {
    key: d,
    namaPemohon: "Syihabudin Tsani",
    nik: "3204251108010006",
    produk: "Experience",
    jenis: "Baru",
    plafond: 5000000 + 500 * d,
    tenor: 10 + d,
    tanggalPengajuan: moment().format("DD/MM/YYYY"),
    tanggalAkad: moment().format("DD/MM/YYYY"),
    tanggalPencairan: moment().format("DD/MM/YYYY"),
    statusVerifikasi: "SETUJU",
    statusApproval: "PENDING",
    ketVerifikasi: "Data bagus dapat dilanjutkan",
    ketApproval: "Oke Lanjut Proses",
    statusPencairan: "TRANSFER",
  };
});
