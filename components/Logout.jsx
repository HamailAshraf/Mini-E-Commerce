'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../context/UserContext';

export const Logout = () => {
    const router = useRouter();
    const {setToken, setRole, setId} = useContext(UserContext);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');

        setToken('');
        setRole(0);
        setId(0);

        router.push('/login');
    };

    return (
        <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleLogout}>Log Out</button>
        </div>
    );
};
