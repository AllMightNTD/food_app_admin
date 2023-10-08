import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { useState } from 'react';
type UserData = {
    name: string;
    email: string;
    created_at: string | Date;
    updated_at: string | Date;
};
const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'created_at', headerName: 'Created At', width: 200 },
    { field: 'updated_at', headerName: 'Updated At', width: 200 },
];

export default function ManageOrder() {
    const [data, setData] = useState([]);
    useQuery<UserData>([`/user`], {
        onSuccess: (data) => {
            console.log('data', data);
            //@ts-ignore();
            setData(data?.data);
        },
        onError: (err: unknown) => {
            console.log('error', err);
        },
    });
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
