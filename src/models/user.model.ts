interface User {
    /**
     * Full name of the user, this should only contain lower- and uppercase letters.
     */
    fullname: string;
    /**
     * Telephone number of the user
     */
    number: string;
    /**
     * Username wich only consists of lowercase letters, an underscore and numbers.
     */
    username: string;
    /**
     * Date of the creation of this object
     */
    createdAt?: string;
    /**
     * Date at which the object was last updated
     */
    updatedAt?: string;
}

export default User;
