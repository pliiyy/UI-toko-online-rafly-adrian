"use client";
import { Button, Input, Modal, Select } from "antd";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IDapem, IJePem, IProPem, IUser } from "../IInterfaces";
import {
  AngsuranFlat,
  GetStartPaidDate,
  IDRFormat,
} from "../utils/FunctionUtils";
import { useUser } from "../contexts/UserContext";

export const UI = () => {
  const [error, setError] = useState<{ status: boolean; msg: string }>({
    status: false,
    msg: "",
  });
  const user = useUser();
  const [productsOption, setProductsOption] = useState<
    {
      label: string;
      options: IProPem[];
    }[]
  >([]);
  const [products, setProducts] = useState<IProPem[]>([]);
  const [jepems, setJepems] = useState<IJePem[]>([]);
  const [data, setData] = useState<IDapem>({
    id: "",
    tanggal: new Date(),
    nik: "",
    namaPemohon: "",
    alamat: "",
    gajiBersih: 0,
    tenor: 0,
    plafon: 0,
    angsuran: 0,
    byAdmin: 0,
    byTabungan: 0,
    byMaterai: 0,
    byTatalaksana: 0,
    blokir: 0,
    penalty: 0,
    pelunasan: 0,
    margin: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    proPemId: "",
    jePemId: "",
    userId: user ? user.id : "",
    ProPem: {
      id: "",
      name: "",
      unit: 0,
      maxTenor: 0,
      maxPlafon: 0,
      maxAngsuran: 0,
      byAdmin: 0,
      byTabungan: 0,
      byMaterai: 0,
      byTatalaksana: 0,
      margin: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    JePem: {
      id: "",
      name: "",
      penalty: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  });
  const [totalPot, setTotalPot] = useState<number>(0);

  // Lifecycle Dapem
  useEffect(() => {
    const { angsuran } = AngsuranFlat(
      data.plafon,
      data.tenor,
      data.ProPem.margin,
      data.ProPem.unit
    );
    const admin = data.plafon * (data.ProPem.byAdmin / 100);
    const tabungan = data.plafon * (data.ProPem.byTabungan / 100);
    const blokir = data.angsuran * data.blokir;

    setData((prev) => ({
      ...prev,
      angsuran: angsuran || 0,
      byAdmin: data.plafon * (data.ProPem.byAdmin / 100),
      byTabungan: data.plafon * (data.ProPem.byTabungan / 100),
      byTatalaksana: data.plafon * (data.ProPem.byTatalaksana / 100),
      byMaterai: data.plafon * (data.ProPem.byMaterai / 100),
      penalty: data.plafon * (data.JePem.penalty / 100),
      margin: data.ProPem.margin,
    }));
    setTotalPot(
      admin + tabungan + blokir + data.byTatalaksana + data.byMaterai
    );
  }, [data.plafon, data.tenor, data.ProPem, data.blokir, data.JePem]);

  // Lifecycle Tenor Plafond
  useEffect(() => {
    if (data.tenor > data.ProPem.maxTenor) {
      setData((prev) => ({ ...prev, tenor: 0 }));
    }
    if (data.plafon > data.ProPem.maxPlafon) {
      setData((prev) => ({ ...prev, plafon: 0 }));
    }
  }, [data.ProPem.maxPlafon, data.ProPem.maxTenor]);

  // Lifecycle Products Option
  useEffect(() => {
    const daily = propem.filter((p) => p.unit === 1);
    const weekly = propem.filter((p) => p.unit === 7);
    const monthly = propem.filter((p) => p.unit === 30);
    setProductsOption([
      { label: "Daily", options: daily },
      { label: "Weekly", options: weekly },
      { label: "Monthly", options: monthly },
    ]);
    setProducts([...daily, ...weekly, ...monthly]);
    setJepems(jePem);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start p-1 gap-2">
      <div className="flex-1">
        <div className="mb-3">
          <p>Tanggal Simulasi</p>
          <Input disabled value={moment(data.tanggal).format("DD/MM/YYYY")} />
        </div>
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <p>Nomor NIK</p>
            <Input
              placeholder="Nomor Induk Kependudukan"
              required
              value={data.nik}
              onChange={(e) =>
                setData((prev) => ({ ...prev, nik: e.target.value }))
              }
            />
          </div>
          <div className="flex-1">
            <p>Nama Pemohon</p>
            <Input
              placeholder="Nama Pemohon"
              required
              value={data.namaPemohon}
              onChange={(e) =>
                setData((prev) => ({ ...prev, namaPemohon: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex gap-2 mb-3 ">
          <div className="flex-1">
            <p>Alamat</p>
            <Input.TextArea
              required
              onChange={(e) =>
                setData((prev) => ({ ...prev, alamat: e.target.value }))
              }
            >
              p
            </Input.TextArea>
          </div>
          <div className="flex-1">
            <p>Gaji Bersih</p>
            <Input
              required
              placeholder="0"
              value={IDRFormat(data.gajiBersih)}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  gajiBersih: parseInt(
                    e.target.value ? e.target.value.replace(/\D/g, "") : "0"
                  ),
                }))
              }
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <p>Produk Pembiayaan</p>
            <Select
              className="w-full"
              placeholder="Select Product"
              options={
                productsOption &&
                productsOption.map((p) => ({
                  label: p.label,
                  options: p.options.map((po) => ({
                    label: po.name,
                    value: po.id,
                  })),
                }))
              }
              onChange={(e) => {
                const filter = products.filter((p) => p.id === e);
                if (filter.length !== 0) {
                  return setData((prev) => ({
                    ...prev,
                    ProPem: filter[0],
                    proPemId: filter[0].id,
                  }));
                }
                alert("Product not found");
              }}
            />
          </div>
          <div className="flex-1">
            <p>Jenis Pembiayaan</p>
            <Select
              className="w-full"
              options={jepems.map((j) => ({ label: j.name, value: j.id }))}
              placeholder="Select Jenis"
              onChange={(e) => {
                const filter = jepems.filter((j) => j.id === e);
                if (filter.length !== 0) {
                  return setData((prev) => ({
                    ...prev,
                    JePem: filter[0],
                    jePemId: filter[0].id,
                  }));
                }
                alert("Jenis Pembiayaan not found");
              }}
            />
          </div>
        </div>
        <div className="bg-green-500 text-gray-50 p-2 rounded text-center my-5">
          <p>Rekomendasi Pembiayaan</p>
        </div>

        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <p>Max Tenor</p>
            <Input
              placeholder="0"
              required
              disabled
              value={data.ProPem.maxTenor}
            />
          </div>
          <div className="flex-1">
            <p>Tenor</p>
            <Input
              value={data.tenor}
              required
              type="number"
              onChange={(e) => {
                const value = parseInt(e.target.value || "0");
                if (value < 0 || value > data.ProPem.maxTenor) {
                  return setData((prev) => ({
                    ...prev,
                    tenor: data.ProPem.maxTenor,
                  }));
                }
                setData((prev) => ({
                  ...prev,
                  tenor: value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <p>Max Plafon</p>
            <Input
              placeholder="0"
              required
              disabled
              value={IDRFormat(data.ProPem.maxPlafon)}
            />
          </div>
          <div className="flex-1">
            <p>Plafon</p>
            <Input
              placeholder="0"
              required
              value={IDRFormat(data.plafon)}
              onChange={(e) => {
                const value = parseInt(
                  e.target.value ? e.target.value.replace(/\D/g, "") : "0"
                );
                if (value > data.ProPem.maxPlafon) {
                  return setData((prev) => ({
                    ...prev,
                    plafon: data.ProPem.maxPlafon,
                  }));
                }
                setData((prev) => ({
                  ...prev,
                  plafon: value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <p>Angsuran</p>
            <Input
              placeholder="0"
              required
              disabled
              value={IDRFormat(data.angsuran)}
            />
          </div>
          <div className="flex-1">
            <p>Sisa Gaji</p>
            <Input
              placeholder="0"
              required
              disabled
              value={IDRFormat(data.gajiBersih - data.angsuran)}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 p-2">
        <div className="bg-red-500 text-gray-50 p-2 font-bold rounded text-sm text-center my-2">
          <p>Keterangan Biaya</p>
        </div>
        <div className="flex items-center border-b py-1">
          <div className="flex-1">
            <p>Administrasi</p>
          </div>
          <div className="flex-1 flex gap-2">
            <div style={{ width: 100 }}>
              <Input
                placeholder="0"
                type="number"
                value={data.ProPem.byAdmin}
                onChange={(e) => {
                  const value = parseFloat(e.target.value || "0");
                  if (value < 0) {
                    return setData((prev) => ({
                      ...prev,
                      byAdmin: 0,
                      ProPem: { ...prev.ProPem, byAdmin: 0 },
                    }));
                  }
                  setData((prev) => ({
                    ...prev,
                    ProPem: {
                      ...prev.ProPem,
                      byAdmin: parseFloat(e.target.value || "0"),
                    },
                  }));
                }}
              />
            </div>
            <Input
              placeholder="0"
              value={IDRFormat(data.byAdmin)}
              onChange={(e) => {
                const value = parseInt(
                  e.target.value ? e.target.value.replace(/\D/g, "") : "0"
                );
                setData((prev) => ({
                  ...prev,
                  byAdmin: value,
                  ProPem: {
                    ...prev.ProPem,
                    byAdmin: (value / data.plafon) * 100,
                  },
                }));
              }}
            />
          </div>
        </div>
        <div className="flex items-center border-b py-1">
          <div className="flex-1">
            <p>Tabungan</p>
          </div>
          <div className="flex-1 flex gap-2">
            <div style={{ width: 100 }}>
              <Input
                placeholder="0"
                type="number"
                value={data.ProPem.byTabungan}
                onChange={(e) => {
                  const value = parseFloat(e.target.value || "0");
                  if (value < 0) {
                    return setData((prev) => ({
                      ...prev,
                      byTabungan: 0,
                      ProPem: { ...prev.ProPem, byTabungan: 0 },
                    }));
                  }
                  setData((prev) => ({
                    ...prev,
                    ProPem: {
                      ...prev.ProPem,
                      byTabungan: parseFloat(e.target.value || "0"),
                    },
                  }));
                }}
              />
            </div>
            <Input
              placeholder="0"
              value={IDRFormat(data.byTabungan)}
              onChange={(e) => {
                const value = parseInt(
                  e.target.value ? e.target.value.replace(/\D/g, "") : "0"
                );
                setData((prev) => ({
                  ...prev,
                  byTabungan: value,
                  ProPem: {
                    ...prev.ProPem,
                    byTabungan: (value / data.plafon) * 100,
                  },
                }));
              }}
            />
          </div>
        </div>
        {data.ProPem.unit === 30 && (
          <div className="flex items-center border-b py-1">
            <div className="flex-1">
              <p>Tatalaksana</p>
            </div>
            <div className="flex-1 flex gap-2">
              <div style={{ width: 100 }}>
                <Input
                  placeholder="0"
                  type="number"
                  value={data.ProPem.byTatalaksana}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value || "0");
                    if (value < 0) {
                      return setData((prev) => ({
                        ...prev,
                        byTatalaksana: 0,
                        ProPem: { ...prev.ProPem, byTatalaksana: 0 },
                      }));
                    }
                    setData((prev) => ({
                      ...prev,
                      ProPem: {
                        ...prev.ProPem,
                        byTatalaksana: parseFloat(e.target.value || "0"),
                      },
                    }));
                  }}
                />
              </div>
              <Input
                placeholder="0"
                value={IDRFormat(data.byTatalaksana)}
                onChange={(e) => {
                  const value = parseInt(
                    e.target.value ? e.target.value.replace(/\D/g, "") : "0"
                  );
                  setData((prev) => ({
                    ...prev,
                    byTatalaksana: value,
                    ProPem: {
                      ...prev.ProPem,
                      byTatalaksana: (value / data.plafon) * 100,
                    },
                  }));
                }}
              />
            </div>
          </div>
        )}
        {data.ProPem.unit === 30 && (
          <div className="flex items-center border-b py-1">
            <div className="flex-1">
              <p>Materai</p>
            </div>
            <div className="flex-1 flex gap-2">
              <div style={{ width: 100 }}>
                <Input
                  placeholder="0"
                  type="number"
                  value={data.ProPem.byMaterai}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value || "0");
                    if (value < 0) {
                      return setData((prev) => ({
                        ...prev,
                        byMaterai: 0,
                        ProPem: { ...prev.ProPem, byMaterai: 0 },
                      }));
                    }
                    setData((prev) => ({
                      ...prev,
                      ProPem: {
                        ...prev.ProPem,
                        byMaterai: parseFloat(e.target.value || "0"),
                      },
                    }));
                  }}
                />
              </div>
              <Input
                placeholder="0"
                value={IDRFormat(data.byMaterai)}
                onChange={(e) => {
                  const value = parseInt(
                    e.target.value ? e.target.value.replace(/\D/g, "") : "0"
                  );
                  setData((prev) => ({
                    ...prev,
                    byMaterai: value,
                    ProPem: {
                      ...prev.ProPem,
                      byMaterai: (value / data.plafon) * 100,
                    },
                  }));
                }}
              />
            </div>
          </div>
        )}
        <div className="flex items-center border-b py-1">
          <div className="flex-1">
            <p>Blokir Angsuran</p>
          </div>
          <div className="flex-1 flex gap-2">
            <div style={{ width: 100 }}>
              <Input
                placeholder="0"
                type="number"
                value={data.blokir}
                onChange={(e) => {
                  const value = parseInt(e.target.value || "0");
                  if (value < 0) {
                    return setData((prev) => ({
                      ...prev,
                      blokir: 0,
                    }));
                  }
                  setData((prev) => ({
                    ...prev,
                    blokir: parseInt(e.target.value || "0"),
                  }));
                }}
              />
            </div>
            <Input
              placeholder="0"
              disabled
              value={IDRFormat(data.blokir * data.angsuran)}
            />
          </div>
        </div>
        <div className="flex items-center border-b py-1 text-red-500">
          <div className="flex-1">
            <p>Total Potongan</p>
          </div>
          <div className="flex-1">
            <Input
              placeholder="0"
              disabled
              value={IDRFormat(
                data.byAdmin + data.byTabungan + data.blokir * data.angsuran
              )}
            />
          </div>
        </div>
        <div className="flex items-center border-b py-1">
          <div className="flex-1">
            <p>Terima Kotor</p>
          </div>
          <div className="flex-1">
            <Input
              placeholder="0"
              disabled
              value={IDRFormat(data.plafon - totalPot)}
            />
          </div>
        </div>
        {data.JePem.name === "Rehab" && (
          <div className="flex items-center border-b py-1 text-red-500">
            <div className="flex-1">
              <p>Penalty Pelunasan</p>
            </div>
            <div className="flex-1 flex gap-2">
              <div style={{ width: 100 }}>
                <Input
                  placeholder="0"
                  type="number"
                  value={data.JePem.penalty}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value || "0");
                    if (value < 0) {
                      return setData((prev) => ({
                        ...prev,
                        JePem: { ...prev.JePem, penalty: 0 },
                      }));
                    }
                    setData((prev) => ({
                      ...prev,
                      JePem: {
                        ...prev.JePem,
                        penalty: parseFloat(e.target.value || "0"),
                      },
                    }));
                  }}
                />
              </div>
              <Input
                placeholder="0"
                value={IDRFormat(data.penalty)}
                onChange={(e) => {
                  const value = parseInt(
                    e.target.value ? e.target.value.replace(/\D/g, "") : "0"
                  );
                  setData((prev) => ({
                    ...prev,
                    penalty: value,
                    JePem: {
                      ...prev.JePem,
                      penalty: (value / data.plafon) * 100,
                    },
                  }));
                }}
              />
            </div>
          </div>
        )}
        {data.JePem.name === "Rehab" && (
          <div className="flex items-center border-b py-1 text-red-500">
            <div className="flex-1">
              <p>Pelunasan</p>
            </div>
            <div className="flex-1">
              <Input
                placeholder="0"
                value={IDRFormat(data.pelunasan)}
                onChange={(e) => {
                  const value = parseInt(
                    e.target.value ? e.target.value.replace(/\D/g, "") : "0"
                  );
                  setData((prev) => ({
                    ...prev,
                    pelunasan: value,
                  }));
                }}
              />
            </div>
          </div>
        )}
        {data.JePem.name === "Rehab" && (
          <div className="flex items-center border-b py-1 text-red-500">
            <div className="flex-1">
              <p>Total Pelunasan</p>
            </div>
            <div className="flex-1">
              <Input
                placeholder="0"
                disabled
                value={IDRFormat(data.pelunasan + data.penalty)}
              />
            </div>
          </div>
        )}
        <div className="flex items-center border-b py-1 font-bold text-green-500">
          <div className="flex-1">
            <p>Terima Bersih</p>
          </div>
          <div className="flex-1">
            <Input
              placeholder="0"
              disabled
              value={IDRFormat(
                data.plafon - (totalPot + data.penalty + data.pelunasan)
              )}
            />
          </div>
        </div>
        {/* <div className="flex items-center border-b py-1 ">
          <div className="flex-1">
            <p>Tanggal Mulai Angsuran</p>
          </div>
          <div className="flex-1">
            <Input
              placeholder="DD/MM/YYYY"
              disabled
              value={
                GetStartPaidDate(
                  data.tanggal,
                  data.tenor,
                  data.blokir,
                  data.ProPem.unit
                ).startDate
              }
            />
          </div>
        </div>
        <div className="flex items-center border-b py-1 ">
          <div className="flex-1">
            <p>Tanggal Lunas</p>
          </div>
          <div className="flex-1">
            <Input
              placeholder="DD/MM/YYYY"
              disabled
              value={
                GetStartPaidDate(
                  data.tanggal,
                  data.tenor,
                  data.blokir,
                  data.ProPem.unit
                ).endDate
              }
            />
          </div>
        </div> */}
        <div className="text-xs text-red-500 italic my-2">
          {error.status && error.msg}
        </div>
        <div className="flex gap-2 justify-end mt-3">
          <Button
            danger
            onClick={() => handleReset({ setData, setTotalPot, setError })}
          >
            Reset
          </Button>
          <SimulationModal user={user} data={data} potongan={totalPot} />
        </div>
      </div>
    </div>
  );
};

const SimulationModal = ({
  data,
  potongan,
  user,
}: {
  data: IDapem;
  potongan: number;
  user: IUser | undefined;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
        disabled={!data.ProPem.name || !data.JePem.name}
      >
        Cek Simulasi
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        wrapClassName="w-[98vw] sm:w-[70vw] mx-auto"
        width={"100%"}
        className="top-5 sm:top-10"
        footer={[
          <Button key={"close"} danger onClick={() => setOpen(false)}>
            Tutup
          </Button>,
        ]}
        title={
          <div className="flex items-center font-bold gap-2">
            <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
            <p>SIMULASI KREDIT</p>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <div className="bg-green-500 text-gray-50 p-2 text-center rounded">
              <p>Data Pemohon</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Tanggal Simulasi</p>
              <p className="text-right">
                {moment(data.tanggal).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Nomor NIK</p>
              <p className="text-right">{data.nik}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Nama Pemohon</p>
              <p className="text-right">{data.namaPemohon}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Alamat</p>
              <p className="text-right ">{data.alamat}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Gaji Bersih</p>
              <p className="text-right">{IDRFormat(data.gajiBersih)}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Produk Pembiayaan</p>
              <p className="text-right">{data.ProPem.name}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Jenis Pembiayaan</p>
              <p className="text-right">{data.JePem.name}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Tenor</p>
              <p className="text-right">{data.tenor}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2 text-green-500 font-bold">
              <p>Plafon</p>
              <p className="text-right">{IDRFormat(data.plafon)}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Angsuran</p>
              <p className="text-right">{IDRFormat(data.angsuran)}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Sisa Gaji</p>
              <p className="text-right">
                {IDRFormat(data.gajiBersih - data.angsuran)}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-red-500 text-gray-50 p-2 text-center rounded">
              <p>Keterangan Biaya/Potongan</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Biaya Administrasi</p>
              <p className="text-right">{IDRFormat(data.byAdmin)}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Biaya Tabungan</p>
              <p className="text-right">{IDRFormat(data.byTabungan)}</p>
            </div>
            {data.ProPem.unit === 30 && (
              <div className="flex justify-between border-b my-2 gap-2">
                <p>Biaya Materai</p>
                <p className="text-right">{IDRFormat(data.byMaterai)}</p>
              </div>
            )}
            {data.ProPem.unit === 30 && (
              <div className="flex justify-between border-b my-2 gap-2">
                <p>Biaya Tatalaksana</p>
                <p className="text-right">{IDRFormat(data.byTatalaksana)}</p>
              </div>
            )}
            <div className="flex justify-between border-b my-2 gap-2">
              <div className="flex-1">
                <p>Blokir Angsuran</p>
              </div>
              <div className="flex-1 flex gap-2  items-center">
                <div className="flex-1 text-xs">
                  <p>
                    {data.blokir} x {IDRFormat(data.angsuran)}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-right">
                    {IDRFormat(data.blokir * data.angsuran)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between border-b my-2 gap-2 text-red-500">
              <p>Total Potongan</p>
              <p className="text-right">{IDRFormat(potongan)}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Terima Kotor</p>
              <p className="text-right">{IDRFormat(data.plafon - potongan)}</p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2 text-red-500">
              <p>Pelunasan</p>
              <p className="text-right">
                {IDRFormat(data.pelunasan + data.penalty)}
              </p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Terima Bersih</p>
              <p className="text-right">
                {IDRFormat(
                  data.plafon - (potongan + data.pelunasan + data.penalty)
                )}
              </p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Tanggal Mulai Angsuran</p>
              <p className="text-right">
                {
                  GetStartPaidDate(
                    data.tanggal,
                    data.tenor,
                    data.blokir,
                    data.ProPem.unit
                  ).startDate
                }
              </p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>Tanggal Lunas</p>
              <p className="text-right">
                {
                  GetStartPaidDate(
                    data.tanggal,
                    data.tenor,
                    data.blokir,
                    data.ProPem.unit
                  ).endDate
                }
              </p>
            </div>
            <div className="flex justify-between border-b my-2 gap-2">
              <p>User</p>
              <p className="text-right">
                {user && user.namaLengkap.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const handleReset = ({
  setData,
  setTotalPot,
  setError,
}: {
  setData: Function;
  setTotalPot: Function;
  setError: Function;
}) => {
  setData({
    id: "",
    tanggal: new Date(),
    nik: "",
    namaPemohon: "",
    alamat: "",
    gajiBersih: 0,
    tenor: 0,
    plafon: 0,
    angsuran: 0,
    byAdmin: 0,
    byTabungan: 0,
    byMaterai: 0,
    byTatalaksana: 0,
    blokir: 0,
    penalty: 0,
    pelunasan: 0,
    margin: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    proPemId: "",
    jePemId: "",
    userId: "",
    ProPem: {
      id: "",
      name: "",
      unit: 0,
      maxTenor: 0,
      maxPlafon: 0,
      maxAngsuran: 0,
      byAdmin: 0,
      byTabungan: 0,
      byMaterai: 0,
      byTatalaksana: 0,
      margin: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    JePem: {
      id: "",
      name: "",
      penalty: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  });
  setError({
    status: false,
    msg: "",
  });
  setTotalPot(0);
};

const propem: IProPem[] = [
  {
    id: "harian",
    name: "Harian",
    maxTenor: 30,
    maxPlafon: 2000000,
    maxAngsuran: 80,
    byAdmin: 5,
    byTabungan: 5,
    byMaterai: 0,
    byTatalaksana: 0,
    unit: 1,
    margin: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },

  {
    id: "mingguan",
    name: "Mingguan",
    maxTenor: 10,
    maxPlafon: 10000000,
    maxAngsuran: 80,
    byAdmin: 5,
    byTabungan: 5,
    byMaterai: 0,
    byTatalaksana: 0,
    unit: 7,
    margin: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: "bulanan",
    name: "Bulanan",
    maxTenor: 60,
    maxPlafon: 50000000,
    maxAngsuran: 80,
    byAdmin: 5,
    byTabungan: 5,
    byMaterai: 1,
    byTatalaksana: 2,
    unit: 30,
    margin: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

const jePem: IJePem[] = [
  {
    id: "1",
    name: "Baru",
    penalty: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: "2",
    name: "Rehab",
    penalty: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];
