import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { Button } from "@mui/joy";

import { NoSidebarLayout } from "../components/layouts";

function Home() {
  return (
    <NoSidebarLayout title='หน้าแรก' currentPage='Home'>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3  w-full gap-2 my-4'>
          <div className=''>
            <Link to='/project'>
              <Button size='lg' fullWidth>
                <div className='py-8'>
                  <div className='text-center text-2xl'>
                    <FontAwesomeIcon icon={faList} />
                  </div>
                  <div className='font-display'>จัดการโปรเจกต์</div>
                </div>
              </Button>
            </Link>
          </div>
          <div className=''>
            <Link to='/management/user'>
              <Button size='lg' color='neutral' fullWidth>
                <div className='py-8'>
                  <div className='text-center text-2xl'>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className='font-display'>จัดการผู้ใช้งาน</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </NoSidebarLayout>
  );
}

export default Home;
