import { ApolloError, useMutation } from "@apollo/client";
import React from "react";
import User from "../../models/user.model";
import { GET_USERS, REMOVE_USER } from "../../state/queries";
import "./UserButtonGroup.css";
import ErrorCaption from "./ErrorCaption";
import { SortOptions } from "../../models/sort_options";

interface RefreshButtonProps {
    refresh: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ refresh }) => {
    return (
        <button style={{ marginRight: 17 }} onClick={refresh}>
            Refresh
        </button>
    );
};

interface SearchInputProps {
    options: SortOptions;
    setOptions: (value: SortOptions) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ setOptions, options }) => {
    return (
        <input
            className="InputSearchName"
            placeholder="Search name"
            value={options.query}
            onChange={(e) => setOptions({ query: e.target.value })}
        />
    );
};

interface DeselectButtonProps {
    pickedUser: string | undefined;
    onDeselect: () => void;
}

const DeselectButton: React.FC<DeselectButtonProps> = ({
    onDeselect,
    pickedUser,
}) => {
    return (
        <button
            onClick={onDeselect}
            disabled={!pickedUser}
            style={{ marginRight: 17 }}
        >
            Deselect
        </button>
    );
};

interface RemoveButtonProps {
    pickedUser: string | undefined;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ pickedUser }) => {
    const [removeUser] = useMutation<{
        user: User;
    }>(REMOVE_USER, {
        refetchQueries: [
            {
                query: GET_USERS,
            },
            "GetUsers",
        ],
    });

    return (
        <button
            disabled={!pickedUser}
            onClick={() =>
                removeUser({
                    variables: {
                        body: {
                            username: pickedUser,
                        },
                    },
                })
            }
        >
            Remove
        </button>
    );
};

interface GroupProps extends SearchInputProps {
    loading: boolean;
    pickedUser: string | undefined;
    onDeselect: () => void;
    error: ApolloError | undefined;
    refresh: () => void;
}

const ButtonGroup: React.FC<GroupProps> = ({
    loading,
    error,
    pickedUser,
    onDeselect,
    setOptions,
    options,
    refresh,
}) => {
    return (
        <div className="ButtonGroup">
            <div>
                <RefreshButton refresh={refresh} />
                <SearchInput options={options} setOptions={setOptions} />
            </div>
            <ErrorCaption error={error} loading={loading} />
            <div>
                <DeselectButton
                    pickedUser={pickedUser}
                    onDeselect={onDeselect}
                />
                <RemoveButton pickedUser={pickedUser} />
            </div>
        </div>
    );
};

export default ButtonGroup;
