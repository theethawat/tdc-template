import { Pagination as MantinePagination, Select } from "@mantine/core";

export default function Pagination({ total, page, size, setPage, setSize }) {
  return (
    <div className='flex justify-end my-2 gap-2 w-full overflow-x-auto'>
      <MantinePagination
        total={total / size + 1}
        withEdges
        value={page}
        onChange={(e) => setPage(e)}
      />
      <Select
        value={size?.toString()}
        checkIconPosition='right'
        onChange={(e) => {
          setPage(1);
          setSize(e);
        }}
        data={["10", "20", "50", "100"]}
      />
    </div>
  );
}
