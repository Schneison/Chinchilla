/**
 * Describes all options that are possible for search
 */
export interface SortOptions {
    /**
     * A key word, for which will be searched in the full name of the users.
     */
    query?: string;
    /**
     * Current page of the database entries
     */
    page?: number;
    /**
     * Page size of the database entries
     */
    pageSize?: number;
}
