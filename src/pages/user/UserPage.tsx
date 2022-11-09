import React, { createContext, useEffect, useReducer, useState } from "react";
import "./UserList.css";
import User from "../../models/user.model";
import { useQuery } from "@apollo/client";
import UserFactory from "./UserFactory";
import { GET_USERS } from "../../state/queries";
import ButtonGroup from "./UserButtonGroup";
import UserList from "./UserList";
import { SortOptions } from "../../models/sort_options";

const reducePicked = (state: User | undefined, payload: User | undefined) => {
    return state == payload ? undefined : payload;
};

const UserPage = () => {
    const [options, setOptions] = useState<SortOptions>({});
    const { loading, error, data, refetch } = useQuery<{ users: User[] }>(
        GET_USERS,
        {
            variables: {},
        }
    );
    const users: User[] = data ? data.users : [];
    const [pickedUser, dispatch] = useReducer(reducePicked, undefined);

    useEffect(() => {
        if (!data || !options?.query) {
            return;
        }
        refetch({
            query: options.query,
        });
    }, [options, data, refetch]);
    return (
        <div>
            <UserFactory picked={pickedUser} updatePicked={dispatch} />
            <ButtonGroup
                loading={loading}
                error={error}
                pickedUser={pickedUser?.username}
                onDeselect={() => dispatch(undefined)}
                options={options}
                setOptions={setOptions}
                refresh={() => {
                    refetch({
                        query: options?.query ?? undefined,
                    });
                }}
            />
            <UserList
                users={users}
                pickeUser={dispatch}
                pickedUsername={pickedUser?.username}
            />
        </div>
    );
};

export default UserPage;
