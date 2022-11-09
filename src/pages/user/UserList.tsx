import React from "react";
import "./UserList.css";
import User from "../../models/user.model";
import UseListItem from "./UseListItem";

interface UserListProps {
    users: User[];
    pickedUsername: string | undefined;
    pickeUser: (username: User) => void;
}

const UserList: React.FC<UserListProps> = ({
    users,
    pickedUsername,
    pickeUser,
}) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Telephone number</th>
                        <th>Username</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <UseListItem
                            key={u.username}
                            user={u}
                            picked={u.username == pickedUsername}
                            onSelect={() => pickeUser(u)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
