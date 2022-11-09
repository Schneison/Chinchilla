import { ApolloError } from "@apollo/client";
import React, { useMemo } from "react";
import "./ErrorCaption.css";
import { ServerError } from "@apollo/client/link/utils";

const getErrorMessage = (error: ApolloError | undefined) => {
    if (!error) {
        return "";
    }
    if (
        error.networkError &&
        "result" in error.networkError &&
        "message" in error.networkError.result
    ) {
        return error.networkError.result.message as string;
    }
    return `${error.name}: ${error.message}`;
};

interface ErrorCaptionProps {
    error: ApolloError | undefined;
    loading: boolean;
}

const ErrorCaption: React.FC<ErrorCaptionProps> = ({ error, loading }) => {
    const message = useMemo(() => getErrorMessage(error), [error]);
    return (
        <div className={error ? "Error" : ""}>
            {loading ? "Loading..." : message}
        </div>
    );
};
export default ErrorCaption;
