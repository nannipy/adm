import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../types/firebase';
import Chat from '../chat/page';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<Array<{id: string, name: string}>>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(database, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Dashboard Admin</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
          <h3>Utenti</h3>
          <ul>
            {users.map(user => (
              <li key={user.id} onClick={() => setSelectedUser(user.id)}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ width: '70%', padding: '10px' }}>
          {selectedUser ? (
            <Chat recipientId={selectedUser} recipientName={users.find(u => u.id === selectedUser)?.name || ''} />
          ) : (
            <p>Seleziona un utente per iniziare la chat.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;