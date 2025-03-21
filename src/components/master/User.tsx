"use client";
import { PlusCircleFilled } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Steps,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { IMenuList, IUser } from "../IInterfaces";
import { menus } from "../layouts/LayoutUser";
import { ModalMessageProps } from "../utils/ServerUtils";
import { User, UserMenu as UMenu } from "@prisma/client";
import moment from "moment";

export const DataKaryawan = () => {
  const [data, setData] = useState<IUser[]>();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>();

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "NO",
      dataIndex: "no",
      className: "text-xs",
      key: "no",
      width: 40,
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
      title: "NAMA LENGKAP",
      dataIndex: "namaLengkap",
      className: "text-xs",
      key: "namaLengkap",
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
      title: "NOMOR NIP",
      dataIndex: "nip",
      className: "text-xs text-center",
      key: "nip",
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
      title: "ALAMAT",
      dataIndex: "alamat",
      className: "text-xs",
      key: "alamat",
      width: 250,
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
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      className: "text-xs",
      width: 100,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            fontSize: 12,
          },
        };
      },
      render(value, record, index) {
        return (
          <div>
            <Tag
              color={
                value === "DEVELOPER"
                  ? "green"
                  : value === "ADMIN"
                  ? "blue"
                  : "orange"
              }
            >
              {value}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "USERNAME",
      dataIndex: "username",
      key: "username",
      className: "text-xs",
      width: 100,
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
      title: "TANGGAL MASUK",
      dataIndex: "createdAt",
      key: "createdAt",
      className: "text-xs text-center",
      width: 120,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            fontSize: 12,
          },
        };
      },
      render(value, record, index) {
        return <div>{moment(value).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "STATUS",
      dataIndex: "isActive",
      key: "isActive",
      className: "text-xs",
      width: 100,
      onHeaderCell: () => {
        return {
          ["style"]: {
            textAlign: "center",
            fontSize: 12,
          },
        };
      },
      render(value, record, index) {
        return (
          <div
            className={`text-center ${
              record.isActive ? "text-green-500" : "text-red-500"
            }`}
          >
            {record.isActive ? "ACTIVE" : "INACTIVE"}
          </div>
        );
      },
    },
  ];

  const getData = async (search?: string) => {
    setLoading(true);
    const res = await fetch(`/api/users${search ? "?name=" + search : ""}`);
    const { data } = await res.json();
    setData(
      data.map((d: IUser) => {
        return {
          ...d,
          key: d.id,
        };
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    let timeout: any;
    (async () => {
      if (search) {
        timeout = setTimeout(async () => {
          await getData(search);
        }, 500);
      }
      await getData();
    })();
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div>
      <div className="p-1 bg-gray-50">
        <Table
          columns={columns}
          size="small"
          bordered
          scroll={{ x: "max-content" }}
          pagination={{
            size: "small",
            pageSizeOptions: [20, 50, 100, 500, 1000, 10000],
            defaultPageSize: 50,
          }}
          dataSource={data}
          loading={loading}
          title={() => (
            <div>
              <div className="font-bold text-xl text-green-500 border-b">
                Data Karyawan
              </div>
              <div className="py-1 flex flex-col sm:flex-row gap-2 justify-between sm:items-end">
                <div className="flex-1 flex items-end gap-2 flex-wrap">
                  <CreateUser getData={getData} />
                </div>
                <div className="flex-2">
                  <Input.Search
                    placeholder="search"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

const CreateUser = ({ getData }: { getData: Function }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<ModalMessageProps>({
    show: false,
    title: "",
    desc: "",
    type: "error",
  });
  const [loading, setLoading] = useState(false);
  const [personal, setPersonal] = useState<User>();
  const [userMenu, setUserMenu] = useState<IMenuList[]>();
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: "Personal",
      content: <Personal handlePersonal={setPersonal} />,
    },
    {
      title: "Main Menu",
      content: <UserMenu setUserMenu={setUserMenu} />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const onFinish = async () => {
    setLoading(true);
    const fixMenu: UMenu[] = [];
    userMenu?.forEach((menu) => {
      if (menu.checked === true) {
        if (menu.children?.length !== 0) {
          menu.children?.forEach((c) => {
            if (c.checked === true) {
              fixMenu.push({
                path: c.key,
                access: c.access.join(","),
                userId: "",
                id: "",
              });
            }
          });
        } else {
          fixMenu.push({
            path: menu.key,
            access: menu.access.join(","),
            userId: "",
            id: "",
          });
        }
      }
    });
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ ...personal, UserMenu: fixMenu }),
    })
      .then((res) => res.json())
      .then(async (result: { msg: string; code: number }) => {
        if (result.code !== 201) {
          setMessage({
            type: "error",
            title: "Terjadi Kesalahan",
            desc: result.msg,
            show: true,
          });
          await getData();
        } else {
          setMessage({
            type: "success",
            title: "Success",
            desc: "Anda berhasil menambahkan user baru",
            show: true,
          });
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage({
          type: "error",
          title: "Internal Server Error",
          desc: "Terjadi kesalahan dan gagal menambahkan user baru. Mohon coba lagi nanti!",
          show: true,
        });
      });
    setLoading(false);
  };

  return (
    <div>
      <Button
        className="bg-green-500 text-white text-xs"
        size="small"
        onClick={() => setOpen(true)}
      >
        <PlusCircleFilled /> New
      </Button>
      <Modal
        title="Tambah Karyawan"
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        wrapClassName="w-[98vw] sm:w-[80vw] mx-auto"
        width={"100%"}
        footer={[]}
        className="top-10"
      >
        <div className="mb-10 w-full sm:w-[500px] m-auto">
          <Steps
            current={current}
            items={items}
            direction="horizontal"
            size="small"
          />
        </div>
        <Form labelCol={{ span: 7 }} onFinish={onFinish}>
          <div>{steps[current].content}</div>
          <Form.Item className="flex justify-end my-4">
            {current < steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => next()}
                disabled={!personal}
                loading={loading}
              >
                Lanjut
              </Button>
            )}
            {current === steps.length - 1 && (
              <div>
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Kembali
                </Button>
                <Button
                  style={{ margin: "0 8px" }}
                  type="primary"
                  htmlType="submit"
                  disabled={!personal || !userMenu}
                  loading={loading}
                >
                  Submit
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
      {message.show && (
        <Modal
          title={
            <span
              className={`${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.title}
            </span>
          }
          footer={[]}
          onCancel={() =>
            setMessage((prev: ModalMessageProps) => {
              return { ...prev, show: false };
            })
          }
          onClose={() =>
            setMessage((prev) => {
              return { ...prev, show: false };
            })
          }
          open={message.show}
        >
          {message.desc}
        </Modal>
      )}
    </div>
  );
};

const Personal = ({ handlePersonal }: { handlePersonal: Function }) => {
  const [data, setData] = useState<object>();
  useEffect(() => {
    if (data) {
      const obj = Object.keys(data);
      if (obj.length === 13) {
        handlePersonal(data);
      }
    }
  }, [data]);
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Form.Item
          label="Nama Lengkap"
          name={"namaLengkap"}
          style={{ marginBottom: 10 }}
          required
          rules={[
            { required: true, message: "Field ini harus diisi!" },
            { min: 5, message: "Field ini min 5 char!" },
          ]}
        >
          <Input
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, namaLengkap: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="NIP"
          name={"nip"}
          required
          style={{ marginBottom: 10 }}
          rules={[
            { required: true, message: "Field ini harus diisi!" },
            {
              pattern: /^\d{5,}$/,
              message: "Field ini min 5 character dan hanya angka!",
            },
          ]}
        >
          <Input
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, nip: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Username"
          name={"username"}
          required
          style={{ marginBottom: 10 }}
          rules={[
            {
              pattern: /^[a-z]{5,}[a-z0-9]*$/,
              message: "Angka dan Huruf, huruf kecil, min 5!",
            },
          ]}
        >
          <Input
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          required
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              min: 5,
              message: "Field ini harus diisi, min 5!",
            },
          ]}
        >
          <Input.Password
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"email"}
          style={{ marginBottom: 10 }}
          required
          rules={[{ required: true, min: 5, message: "min 5 char!" }]}
        >
          <Input
            type="email"
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Telepon/Wa"
          name={"phone"}
          style={{ marginBottom: 10 }}
          required
          rules={[{ required: true, min: 10, message: "min 10!" }]}
        >
          <Input
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, phone: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Role"
          name={"role"}
          required
          style={{ marginBottom: 10 }}
        >
          <Select
            options={[
              { label: "Developer", value: "DEVELOPER" },
              { label: "Admin", value: "ADMIN" },
              { label: "Marketing", value: "MARKETING" },
            ]}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, role: e };
              })
            }
          />
        </Form.Item>
      </div>
      <div className="flex-1">
        <Form.Item
          label="Jenis Kelamin"
          name={"jenisKelamin"}
          style={{ marginBottom: 10 }}
          required
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Laki Laki", value: "Laki_laki" },
              { label: "Perempuan", value: "Perempuan" },
            ]}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, jenisKelamin: e };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Alamat"
          name={"alamat"}
          style={{ marginBottom: 10 }}
          required
          rules={[{ required: true, min: 7, message: "min 10!" }]}
        >
          <Input.TextArea
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, alamat: e.target.value };
              })
            }
          ></Input.TextArea>
        </Form.Item>
        <Form.Item
          label="Kelurahan"
          name={"kelurahan"}
          style={{ marginBottom: 10 }}
          required
          rules={[{ required: true, min: 5, message: "min 5!" }]}
        >
          <Input
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, kelurahan: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Kecamatan"
          name={"kecamatan"}
          style={{ marginBottom: 10 }}
          required
          rules={[{ required: true, min: 5, message: "min 5!" }]}
        >
          <Input
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, kecamatan: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Kab/Kota"
          name={"kota"}
          style={{ marginBottom: 10 }}
          required
          rules={[{ required: true, min: 5, message: "min 5!" }]}
        >
          <Input
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, kota: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Provinsi"
          name={"provinsi"}
          style={{ marginBottom: 10 }}
          required
          rules={[{ required: true, min: 5, message: "min 5!" }]}
        >
          <Input
            required
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, provinsi: e.target.value };
              })
            }
          />
        </Form.Item>
      </div>
    </div>
  );
};

const UserMenu = ({ setUserMenu }: { setUserMenu: Function }) => {
  const [data, setData] = useState<IMenuList[]>(
    menus.map((m) => {
      const child =
        m.children &&
        m.children.map((mc) => {
          return { ...mc, access: [], checked: false };
        });
      return {
        ...m,
        access: [],
        checked: false,
        children: m.children ? child : [],
      };
    })
  );

  const handleChange = (menu: IMenuList) => {
    setData((prev) => {
      prev = prev.map((p) => {
        if (p.key === menu.key) {
          p = menu;
        }
        return p;
      });
      return prev;
    });
  };

  useEffect(() => {
    setUserMenu(data);
  }, [data]);

  return (
    <div>
      <div className="flex gap-10">
        <div className="flex flex-wrap justify-around gap-5">
          {data.map((m: IMenuList, i: number) => (
            <div key={i} className="border-b p-2">
              <CheckBoxItem menu={m} key={i} onChange={handleChange} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CheckBoxItem = ({
  menu,
  onChange,
}: {
  menu: IMenuList;
  onChange: Function;
}) => {
  const [data, setData] = useState<IMenuList>(menu);

  useEffect(() => {
    onChange(data);
  }, [data]);

  return (
    <div>
      {data.children && data.children.length !== 0 ? (
        <div>
          <Checkbox checked={data.checked} name={data.key} disabled>
            {data.label}
          </Checkbox>
          <AccessChildUtils menu={data} handleChange={setData} />
        </div>
      ) : (
        <div>
          <Checkbox checked={data.checked} name={data.key} disabled>
            {data.label}
          </Checkbox>
          <AccessUtils menu={data} handleChange={setData} />
        </div>
      )}
    </div>
  );
};

const AccessUtils = ({
  menu,
  handleChange,
}: {
  menu: IMenuList;
  handleChange: Function;
}) => {
  const [data, setData] = useState<IMenuList>(menu);

  const onChange = (value: string) => {
    const access = data.access;
    if (access.includes(value)) {
      setData((prev) => {
        const tempAccess = access.filter((p) => p !== value);
        return {
          ...prev,
          checked: tempAccess.length === 0 ? false : true,
          access: tempAccess,
        };
      });
    } else {
      setData((prev) => {
        const tempAccess = [...access, value];
        return {
          ...prev,
          checked: true,
          access: tempAccess,
        };
      });
    }
  };

  useEffect(() => {
    handleChange(data);
  }, [data]);

  return (
    <div className="ms-10 flex gap-2">
      {["Read", "Write", "Update", "Delete"].map((access) => (
        <Checkbox
          key={access}
          name={access}
          className="text-xs"
          onChange={() => onChange(access)}
        >
          {access}
        </Checkbox>
      ))}
    </div>
  );
};
const AccessChildUtils = ({
  menu,
  handleChange,
}: {
  menu: IMenuList;
  handleChange: Function;
}) => {
  const [data, setData] = useState<IMenuList>(menu);

  const onChange = (key: string, value: string) => {
    const filterChild = data.children?.filter((c) => c.key == key);
    if (!filterChild) return;

    if (filterChild[0].access.includes(value)) {
      const newAccess = filterChild[0].access.filter((p) => p !== value);
      filterChild[0].access = newAccess;
    } else {
      filterChild[0].access.push(value);
    }

    setData((prev) => {
      const child = prev.children?.map((c) => {
        if (c.key === key) {
          c = filterChild[0];
          c.checked = filterChild[0].access.length === 0 ? false : true;
        }
        return c;
      });
      const filterChildChecked = child?.filter((c) => c.checked === true);
      return {
        ...prev,
        checked: filterChildChecked?.length === 0 ? false : true,
      };
    });
  };

  useEffect(() => {
    handleChange(data);
  }, [data]);

  return (
    <div>
      {data.children &&
        data.children.map((mc) => (
          <div key={mc.key} className="ms-8">
            <Checkbox checked={mc.checked} name={mc.key} disabled>
              {mc.label}
            </Checkbox>
            <div className="ms-10 flex gap-2">
              {["Read", "Write", "Update", "Delete"].map((access) => (
                <Checkbox
                  key={access}
                  name={access}
                  className="text-xs"
                  onChange={() => onChange(mc.key, access)}
                >
                  {access}
                </Checkbox>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
