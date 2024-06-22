import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';



export default function BasicTable({rows, columns, populateRows}) {
  const [page, pageChange] = React.useState(0)
  const [rowsPerPage, rowsPerPageChange] = React.useState(5)

  const handlePageChange = (event, newPage) => {
    pageChange(newPage)
  }

  const handleRowsPerPage = (event) => {
    rowsPerPageChange(+event.target.value)
    pageChange(0)
  }



  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, height: 80 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns?.map((col, idx) => <TableCell key={idx} sx={{fontWeight: 'bold'}}>{col}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {populateRows(page, rowsPerPage)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10]}
        page={page}
        rowsPerPage={rowsPerPage}
        count={rows?.length}
        component={'div'}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPage}
      />
    </>
    

  );
}