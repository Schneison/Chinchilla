import User from "../../models/user.model";
import React, { useMemo } from "react";

interface UseListItemProps {
    user: User;
    picked: boolean;
    onSelect: () => void;
}

const convertDate = (data: string | undefined) => {
    if (!data) {
        return "missing";
    }
    return new Date(data).toLocaleDateString();
};

const UseListItem: React.FC<UseListItemProps> = ({
    user,
    picked,
    onSelect,
}) => {
    const createDate = useMemo(
        () => convertDate(user.createdAt),
        [user.createdAt]
    );
    const updateDate = useMemo(
        () => convertDate(user.updatedAt),
        [user.updatedAt]
    );
    return (
        <tr onClick={onSelect} className={picked ? "picked" : ""}>
            <td>{user.fullname}</td>
            <td>{user.number}</td>
            <td>{user.username}</td>
            <td>{createDate}</td>
            <td>{updateDate}</td>
        </tr>
    );
};

export default UseListItem;
