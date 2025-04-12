/* This example requires Tailwind CSS v2.0+ */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Breadcrumbs,
  Text,
  Button,
  Skeleton,
  AppShell,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavHeader, Footer } from "../common/navbar";
import menuList from "../../configs/general/menuList";
import { IconChevronLeft } from "@tabler/icons-react";
import _ from "lodash";
import { UserButton } from "../common/buttons";
import classes from "../../assets/css/NavbarNested.module.css";
import { LinksGroup } from "../common/navbar/NavbarLinksGroup";

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
  const [opened, { toggle }] = useDisclosure(false);
  const links = menuList.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      initiallyOpened={window?.location?.pathname?.includes(item.moduleName)}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <NavHeader userData={me} opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <AppShell.Section></AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </AppShell.Section>
        <AppShell.Section>
          <div className={classes.footer}>
            <UserButton selectedUser={me} />
          </div>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <div className=' py-6 md:pl-8  px-4 lg:pl-8 lg:ml-8'>
          <div className='flex justify-between items-center w-full '>
            <div className='w-3/5 '>
              <div className='ml-2'>
                <Breadcrumbs aria-label='breadcrumbs' size='sm'>
                  {_.map(hirachyList, (item) => {
                    return (
                      <Link key={item?.link} to={item?.link} color='neutral'>
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
      </AppShell.Main>

      <Footer />
    </AppShell>
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
