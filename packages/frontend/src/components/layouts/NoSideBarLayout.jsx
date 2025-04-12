/* This example requires Tailwind CSS v2.0+ */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavHeader, Footer } from "../common/navbar";

// eslint-disable-next-line max-len
export default function NoSidebarLayout({
  title,
  currentPage,
  rightContainer,
  useBackButton,

  children,
}) {
  const me = useSelector((state) => state.me);
  const navigate = useNavigate();
  return (
    <div>
      <NavHeader userData={me} currentPage={currentPage} forceDisplay={true} />
      <div className='min-h-screen'>
        <div className='w-full py-6 px-16 md:px-24 lg:px-48  container'>
          <div className='flex justify-between w-full '>
            <div className='w-3/5 '>
              <h1 className='text-2xl  ml-2 font-display font-bold text-gray-900'>
                {title}
              </h1>
            </div>
            <div className='w-2/5 flex justify-end'>
              {rightContainer}
              {useBackButton && (
                <Button
                  color='neutral'
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className='mr-2' />
                  กลับ
                </Button>
              )}
            </div>
          </div>
          <div className='my-2 '>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

NoSidebarLayout.propTypes = {
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
};

NoSidebarLayout.defaultProps = {
  title: "",
  currentPage: "",
  rightContainer: <div />,
  useBackButton: false,
};
