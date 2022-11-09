import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query GetUsers($query: String, $page: Int, $pageSize: Int) {
        users(query: $query)
            @rest(type: "User", path: "users/all?{args}", method: "GET") {
            username
            number
            fullname
            createdAt
            updatedAt
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($input: User!) {
        user(input: $newUser)
            @rest(type: "User", path: "users/add", method: "POST") {
            username
            number
            fullname
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_USER = gql`
    mutation addUser($input: User!, $username: String!) {
        user(input: $newUser, username: $username)
            @rest(
                type: "User"
                path: "users/edit?username={args.username}"
                method: "POST"
            ) {
            username
            number
            fullname
            createdAt
            updatedAt
        }
    }
`;

export const REMOVE_USER = gql`
    mutation removeUser($input: User!) {
        user(input: $body)
            @rest(type: "User", path: "users/remove", method: "POST") {
            username
            number
            fullname
            createdAt
            updatedAt
        }
    }
`;
