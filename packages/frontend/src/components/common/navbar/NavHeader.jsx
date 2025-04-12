import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import classes from "../../../assets/css/HeaderTab.module.css";
import {
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
  Burger,
} from "@mantine/core";
import { information } from "@iarc-programing/tp2025-constants";
import Avvvatars from "avvvatars-react";
import * as actions from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
export default function NavHeader({ userData, opened, toggle }) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size=''>
        <Group justify='space-between'>
          <div className={"flex gap-2 items-center"}>
            <Link to='/'>
              <div className='text-lg font-semibold ml-6'>
                {information.title}
              </div>
            </Link>
            <div className='lg:hidden'>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom='sm'
                size='sm'
              />
            </div>
          </div>
          <Menu
            width={260}
            position='bottom-end'
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
            opened={userMenuOpened}
          >
            <Menu.Target>
              <UnstyledButton>
                <Group gap={7}>
                  <Avvvatars value={userData.name} style='shape' />
                  <div className='hidden lg:block'>
                    <Text fw={500} size='sm' lh={1} mr={3}>
                      {userData.name}
                    </Text>
                  </div>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    size={16}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    size={16}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    size={16}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}
              >
                Change account
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout size={16} stroke={1.5} />}
                onClick={() => {
                  dispatch(actions.meLogOut());
                  navigate("/login");
                }}
              >
                Logout
              </Menu.Item>

              <Menu.Divider />
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}

NavHeader.propTypes = {
  userData: PropTypes.shape({
    isReady: PropTypes.bool,
    name: PropTypes.string,
    role: PropTypes.string,
    username: PropTypes.string,
  }),
  currentPage: PropTypes.string,
};

NavHeader.defaultProps = {
  userData: {
    isReady: true,
    name: "",
    role: "",
    username: "",
  },
};
