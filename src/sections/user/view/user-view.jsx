import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import './Modal.scss';
import close from '../../../../public/assets/close.svg'

import axios from 'axios';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://192.168.110.136:3001/api/patients', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setPatients(res.data.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <>
      <div className={modal ? 'modal active' : 'modal'}>
        <div className="modal__wrapper">
          <h1 className="modal__wrapper-title">Add user</h1>
          <img onClick={() => setModal(false)} className='modal__wrapper-img' src={close} alt="" />
          <div className="modal__wrapper-logo">
            <div className="modal__wrapper-logo-icon"></div>
            <button className="modal__wrapper-logo-button">Add image</button>
          </div>
          <div className="modal__wrapper-inputs">
            <div className='modal__wrapper-inputs-input'>
              <p>full name</p>
              <input type="text" />
            </div>
            <div className='modal__wrapper-inputs-input'>
              <p>username</p>
              <input type="text" />
            </div>
            <div className='modal__wrapper-inputs-input'>
              <p>email</p>
              <input type="text" />
            </div>
            <div className='modal__wrapper-inputs-input'>
              <p>projects</p>
              <input type="text" />
            </div>
            <select className='modal__wrapper-inputs-section'>
              <option value="">User</option>
              <option value="">Admin</option>
            </select>
            <div className='modal__wrapper-inputs-radio'>
              <input type="checkbox" />
              <p>Active</p>
            </div>
          </div>
          <div className='modal__wrapper-textarea'>
            <p>notes</p>
            <textarea name="" id=""></textarea>
          </div>
          <div className='modal__wrapper-buttons'>
            <button>Cancel</button>
            <button>Add</button>
          </div>
        </div>
      </div>
      <Container>
        {patients.length === 0 ? (
          <div>
            <h1 className='text-6xl text-blue-400 cursor-default'>Вы не зарегистрированы</h1>
            <Link to='/login' className='bg-blue-500 text-white text-lg py-2 px-5 rounded-md cursor-pointer duration-200 hover:bg-blue-600'><button className='mt-8'>Войти</button></Link>
          </div>
        ) : (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4">Patients</Typography>

              <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => setModal(true)}
              >
                New User
              </Button>
            </Stack>

            <Card>
              <UserTableToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table sx={{ minWidth: 800 }}>
                    <UserTableHead
                      order={order}
                      orderBy={orderBy}
                      rowCount={users.length}
                      numSelected={selected.length}
                      onRequestSort={handleSort}
                      onSelectAllClick={handleSelectAllClick}
                      headLabel={[
                        { id: 'name', label: 'Name' },
                        { id: 'company', label: 'Last Name' },
                        { id: 'role', label: 'Phone' },
                        { id: 'isVerified', label: 'Verified', align: 'center' },
                        { id: 'status', label: 'Middle Name' },
                        { id: '' },
                      ]}
                    />
                    <TableBody>
                      {patients.map((row) => (
                        <UserTableRow
                          key={row.id}
                          name={row.first_name}
                          role={row.phone_number}
                          status={row.middle_name}
                          company={row.last_name}
                          avatarUrl={row.avatarUrl}
                        />
                      ))}
                      <TableEmptyRows
                        height={77}
                        emptyRows={emptyRows(page, rowsPerPage, users.length)}
                      />

                      {notFound && <TableNoData query={filterName} />}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </>
        )}
      </Container>
    </>
  );
}
