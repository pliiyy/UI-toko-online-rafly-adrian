"use client";
import {
  LoginOutlined,
  SecurityScanOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button, Form, Image, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalMessageProps } from "../utils/ServerUtils";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<ModalMessageProps>({
    show: false,
    title: "",
    desc: "",
    type: "error",
  });
  const router = useRouter();

  const onSubmit = async (e: { username: string; password: string }) => {
    setLoading(true);
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(e),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.status !== 200) {
          setMessage({
            type: "error",
            title: "Authentication Failed",
            show: true,
            desc: (
              <div>
                <p className="text-red-500">Wrong username or password!.</p>
                <div className="text-xs text-blue-500 italic my-1">
                  <p>
                    If youre forgot username or password, you can contact our
                    Administrator KOPJAS FAS by Whatsapp :
                  </p>
                  <div className="my-2 flex gap-3">
                    <WhatsAppOutlined /> <span>0881 - 0221 - 57439</span>
                  </div>
                </div>
              </div>
            ),
          });
          return;
        }
        setTimeout(() => {
          router.push("/auths/");
        }, 100);
        return;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setMessage({
          type: "error",
          title: "Internal Server Error",
          show: true,
          desc: (
            <div className="text-red-500">
              <p>Sorry we have some problem at this time. Check again later!</p>
            </div>
          ),
        });

        return;
      });
  };
  return (
    <div className="flex justify-around items-center">
      <div className="flex-1 hidden sm:flex justify-center">
        <Image src="/bg-login.png" alt="Security Image" />
      </div>
      <div className="flex-1 flex justify-center">
        <Form
          className="w-[95%] sm:w-[400px] bg-gray-50 rounded shadow-md p-7"
          layout="vertical"
          onFinish={onSubmit}
          disabled={loading}
        >
          <div className="flex justify-center ">
            <div className="w-[40%] sm:w-[20%]">
              <Image
                src={process.env.NEXT_PUBLIC_APP_ICON || "/logo.png"}
                width={"100%"}
                alt="Company Logo"
              />
            </div>
          </div>
          <Form.Item
            label="Username"
            name={"username"}
            rules={[
              {
                required: true,
                whitespace: false,
                message: "Please input username field",
              },
              { min: 3, message: "min 3 character" },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
                whitespace: false,
                message: "Please input password field",
              },
              { min: 3, message: "min 3 character" },
            ]}
          >
            <Input.Password prefix={<SecurityScanOutlined />} />
          </Form.Item>
          <div className="my-8">
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              icon={<LoginOutlined />}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
      {message.show && (
        <Modal
          title={<span className="text-red-500">{message.title}</span>}
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
}
