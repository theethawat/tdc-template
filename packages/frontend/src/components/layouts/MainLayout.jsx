/* This example requires Tailwind CSS v2.0+ */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Breadcrumbs, Text, Button, Skeleton, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavHeader, Footer, Sidebar } from "../common/navbar";
import menuList from "../../configs/general/menuList";
import { IconChevronLeft } from "@tabler/icons-react";
import _ from "lodash";

// eslint-disable-next-line max-len
export default function MainLayout({
  title,
  rightContainer,
  useBackButton,
  hirachyList = [{ label: "หน้าหลัก", link: "/" }],
  isReady = true,
  children,
}) {
  const me = useSelector((state) => state.me);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <div className='min-h-screen'>
        <Drawer opened={opened} onClose={close} size='sm'>
          <Sidebar menuList={menuList} userData={me} />
        </Drawer>
        <div className='flex flex-wrap max-w-full'>
          <div className='lg:w-1/4 xl:w-1/6 hidden lg:block'>
            <Sidebar menuList={menuList} userData={me} />
          </div>
          <div className='lg:w-3/4 xl:w-5/6 w-full'>
            <NavHeader userData={me} handleOpenDrawer={open} />
            <div className=' py-6 md:pl-8  px-4 lg:pl-8 lg:ml-8'>
              <div className='flex justify-between items-center w-full '>
                <div className='w-3/5 '>
                  <div className='ml-2'>
                    <Breadcrumbs aria-label='breadcrumbs' size='sm'>
                      {_.map(hirachyList, (item) => {
                        return (
                          <Link
                            key={item?.link}
                            to={item?.link}
                            color='neutral'
                          >
                            {item?.label}
                          </Link>
                        );
                      })}
                      <Text>{title}</Text>
                    </Breadcrumbs>
                  </div>
                  <h1 className='text-3xl my-2 ml-2 font-display font-bold text-gray-900'>
                    {title}
                  </h1>
                </div>
                <div className='w-2/5 flex justify-end items-end'>
                  {rightContainer}
                  {useBackButton && (
                    <div>
                      <Button
                        color='gray'
                        onClick={() => {
                          navigate(-1);
                        }}
                        leftSection={<IconChevronLeft size={18} />}
                      >
                        กลับ
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {!isReady ? (
                <div>
                  <Skeleton height={8} mt={6} radius='xl' />
                  <Skeleton height={8} mt={6} radius='xl' />
                  <Skeleton height={8} mt={6} radius='xl' />
                </div>
              ) : (
                <div className='mt-6 md:mt-4 px-2'>{children}</div>
              )}
            </div>
          </div>
        </div>{" "}
        <Footer />
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  currentPage: PropTypes.string,
  rightContainer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  useBackButton: PropTypes.bool,
  hirachyList: PropTypes.arrayOf(PropTypes.string),
};

MainLayout.defaultProps = {
  title: "",
  currentPage: "",
  rightContainer: <div />,
  useBackButton: false,
  hirachyList: [{ label: "หน้าหลัก", link: "/" }],
};
