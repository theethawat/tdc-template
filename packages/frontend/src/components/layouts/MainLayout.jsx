/* This example requires Tailwind CSS v2.0+ */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Breadcrumbs, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavHeader, Footer, Sidebar } from "../common/navbar";
import menuList from "../../configs/general/menuList";
import { IconChevronLeft } from "@tabler/icons-react";

// eslint-disable-next-line max-len
export default function MainLayout({
  title,
  currentPage,
  rightContainer,
  useBackButton,
  hirachyList = ["หน้าหลัก"],
  children,
}) {
  const me = useSelector((state) => state.me);
  const navigate = useNavigate();
  return (
    <div>
      <div className='min-h-screen'>
        <NavHeader userData={me} currentPage={currentPage} />
        <div className='flex flex-wrap'>
          <div className='lg:w-1/6 hidden lg:block'>
            <Sidebar menuList={menuList} userData={me} />
          </div>
          <div className='lg:w-3/4'>
            <div className='w-full py-6 md:mx-12  container px-4 lg:px-8  '>
              <div className='flex justify-between  w-full '>
                <div className='w-3/5 '>
                  <div className='ml-2'>
                    <Breadcrumbs aria-label='breadcrumbs' size='sm'>
                      {hirachyList.map((item) => (
                        <Link key={item} color='neutral' href='#basics'>
                          {item}
                        </Link>
                      ))}
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
              <div className='mt-4'>{children}</div>
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
  hirachyList: ["หน้าหลัก"],
};
