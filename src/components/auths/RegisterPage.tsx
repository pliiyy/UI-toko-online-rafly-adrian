"use client";

// import { GoogleCircleFilled } from "@ant-design/icons";
import { Button, Checkbox, Form, Image, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { ModalMessageProps } from "../IInterfaces";
import { NotificationModal } from "../layouts/Utils";

interface registerForm {
  fullname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
}

export default function RegisterPage() {
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalNotif, setModalNotif] = useState<ModalMessageProps>({
    show: false,
    title: "",
    desc: "",
    type: "error",
  });

  const handleRegister = async (e: registerForm) => {
    setLoading(true);
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({
        fullname: e.fullname,
        username: e.username,
        email: e.email,
        password: e.password,
        phone: e.phone,
        address: e.address,
        role: "PELANGGAN",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setModalNotif({
          type: "success",
          title: "Berhasli",
          desc: (
            <div>
              <p>{res.msg}</p>
              <div className="my-5 flex justify-end">
                <Link href={"/sign-in"}>
                  <Button type="primary" size="small">
                    Go to Login
                  </Button>
                </Link>
              </div>
            </div>
          ),
          show: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setModalNotif({
          type: "error",
          title: "Error",
          desc: (
            <div>
              <p>{err.msg}</p>
            </div>
          ),
          show: true,
        });
      });
    setLoading(false);
  };

  return (
    <div className="mt-10 p-4 sm:p-6 flex gap-2 items-center">
      <div className="flex-1 hidden sm:block">
        <Image src="bg-login.png" alt="Security Image" />
      </div>
      <div className="flex-1 bg-white p-5 rounded">
        <p className="font-bold text-xl mt-5 mb-10 text-center">
          Registration Form
        </p>
        <Form labelCol={{ span: 7 }} onFinish={handleRegister}>
          <Form.Item
            label="Nama Lengkap"
            name={"fullname"}
            required
            rules={[
              { required: true, message: "Wajib diisi" },
              { min: 3, message: "Minimal 3 Karakter" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Hanya menerima huruf dan spasi",
              },
            ]}
          >
            <Input
              onInput={(e) =>
                ((e.target as HTMLInputElement).value = (
                  e.target as HTMLInputElement
                ).value
                  .split(" ") // Split the string into words
                  .map((word) => {
                    return (
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    );
                  })
                  .join(" "))
              }
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name={"email"}
            required
            rules={[
              { required: true, message: "Wajib diisi" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email tidak valid",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name={"username"}
            required
            rules={[
              { required: true, message: "Wajib diisi" },
              { min: 5, message: "Minimal 5 Karakter" },
              {
                pattern: /^[A-Za-z0-9]+$/,
                message: "Hanya menerima huruf dan angka",
              },
            ]}
          >
            <Input
              onInput={(e) => {
                let value = (e.target as HTMLInputElement).value;
                value = value.replace(" ", "");

                // Update nilai input setelah menghapus awalan
                return ((e.target as HTMLInputElement).value =
                  value.toLocaleLowerCase());
              }}
            />
          </Form.Item>
          <Form.Item
            label="password"
            name={"password"}
            required
            rules={[
              { required: true, message: "Wajib diisi" },
              { min: 6, max: 20, message: "6 - 20 Karakter" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
                message:
                  "Harus mengandung minimal 1 huruf besar, satu huruf kecil dan satu angka",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Konfirmasi Password"
            name={"confirmPassword"}
            required
            rules={[
              { required: true, message: "Wajib diisi" },
              { min: 6, max: 20, message: "6 - 20 Karakter" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
                message:
                  "Harus mengandung minimal 1 huruf besar, satu huruf kecil dan satu angka",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Konfirmasi password salah"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Whatsapp"
            name={"phone"}
            required
            rules={[
              { required: true, message: "Wajib diisi" },
              {
                pattern: /^[1-9][0-9]{9,11}$/,
                message: "Nomor whatsapp tidak valid",
              },
            ]}
          >
            <Input
              prefix={"62"}
              onInput={(e) => {
                let value = (e.target as HTMLInputElement).value;
                value = value.replace(/\D/g, "");

                value = value.replace(/^0|^62/, "");

                // Update nilai input setelah menghapus awalan
                return ((e.target as HTMLInputElement).value = value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Alamat"
            name={"address"}
            required
            rules={[
              { required: true, message: "Wajib diisi" },
              { min: 5, message: "Minimal 6 Karakter" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={"accepted"}
            label={<span className="hidden">Terms and conditions</span>}
          >
            <Checkbox
              checked={accept}
              onChange={() => setAccept(!accept)}
              className="text-xs"
            >
              Setuju dengan <span className="text-blue-500">syarat</span> dan{" "}
              <span className="text-blue-500">ketentuan</span>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              disabled={!accept || loading}
              loading={loading}
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-xs">
          <p>
            Sudah punya akun?{" "}
            <Link href={"/sign-in"} className="italic text-blue-500">
              Login now
            </Link>
          </p>
        </div>
      </div>
      <NotificationModal data={modalNotif} setData={setModalNotif} />
    </div>
  );
}
