"use client";

import {
  AppstoreOutlined,
  CarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuthSession } from "@/features/auth/model/hooks";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { key: "/admin/cars", icon: <CarOutlined />, label: <Link href="/admin/cars">Cars</Link> },
  {
    key: "/admin/categories",
    icon: <AppstoreOutlined />,
    label: <Link href="/admin/categories">Categories</Link>,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthSession();

  const selectedKey = menuItems.find((item) => pathname.startsWith(item.key))?.key ?? "/admin/cars";

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsedWidth={0} theme="light" className="!border-r !border-gray-200">
        <div className="flex h-16 items-center px-6">
          <Title level={4} className="!mb-0">
            Arlo Admin
          </Title>
        </div>
        <Menu mode="inline" selectedKeys={[selectedKey]} items={menuItems} />
      </Sider>

      <Layout>
        <Header className="!flex !items-center !justify-end !bg-white !px-6 !border-b !border-gray-200">
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content className="bg-gray-50 p-6">{children}</Content>
      </Layout>
    </Layout>
  );
}
