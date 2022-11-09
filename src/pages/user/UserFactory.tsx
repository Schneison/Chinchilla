import { useMutation } from "@apollo/client";
import User from "../../models/user.model";
import React, {
    createRef,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { ADD_USER, GET_USERS, UPDATE_USER } from "../../state/queries";
import "./UserFactory.css";
import ErrorCaption from "./ErrorCaption";

const CountryGroup = () => {
    return (
        <optgroup label="Other countries">
            <option value="213">Algeria (+213)</option>
            <option value="376">Andorra (+376)</option>
            <option value="244">Angola (+244)</option>
            <option value="1264">Anguilla (+1264)</option>
            <option value="54">Argentina (+54)</option>
            <option value="374">Armenia (+374)</option>
            <option value="297">Aruba (+297)</option>
            <option value="61">Australia (+61)</option>
            <option value="43">Austria (+43)</option>
            <option value="994">Azerbaijan (+994)</option>
            <option value="1242">Bahamas (+1242)</option>
            <option value="973">Bahrain (+973)</option>
            <option value="880">Bangladesh (+880)</option>
            <option value="1246">Barbados (+1246)</option>
            <option value="375">Belarus (+375)</option>
            <option value="32">Belgium (+32)</option>
            <option value="501">Belize (+501)</option>
            <option value="229">Benin (+229)</option>
            <option value="1441">Bermuda (+1441)</option>
            <option value="975">Bhutan (+975)</option>
            <option value="591">Bolivia (+591)</option>
            <option value="387">Bosnia Herzegovina (+387)</option>
            <option value="267">Botswana (+267)</option>
            <option value="55">Brazil (+55)</option>
            <option value="33">France (+33)</option>
        </optgroup>
    );
};

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const FullNameInput: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <div className="FormItem">
            <label htmlFor="fname">Full Name</label>
            <br />
            <input
                type="text"
                id="fname"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                required
                title="Full name"
                pattern="^[a-zA-Zäöü ,.'-]+$"
            />
        </div>
    );
};

const UsernameInput: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <div className="FormItem">
            <label htmlFor="fusername">Username:</label>
            <br />
            <input
                type="text"
                id="fusername"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                required
                pattern="^[a-zäöü0-9ÄÖÜ]+[a-zäöü0-9ÄÖÜ_]*$"
                title="Username in snake_case"
            />
        </div>
    );
};

const NumberInput: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="fnumber">Telephone number:</label>
            <br />
            <input
                type="text"
                id="fnumber"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                required
                title="Phone Number"
                pattern="\b\d(?: ?\d){8,14}\b"
            />
        </div>
    );
};

const CountrySelect: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <div className="FormItem">
            <label htmlFor="fcountry">Choose a country:</label>
            <br />
            <select
                id="fcountry"
                name="country"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {/* https://gist.github.com/andyj/7108917 */}
                <option value="49">Germany (+49)</option>
                <option value="44">UK (+44)</option>
                <option value="1">USA (+1)</option>
                <CountryGroup />
            </select>
        </div>
    );
};

interface UserFactoryProps {
    picked: User | undefined;
    updatePicked: (picked: User | undefined) => void;
}

const UserFactory: React.FC<UserFactoryProps> = ({ picked, updatePicked }) => {
    const [addUser, { data, error, loading, reset }] = useMutation<{
        user: User;
    }>(ADD_USER, {
        refetchQueries: [
            {
                query: GET_USERS,
            },
            "GetUsers",
        ],
    });

    const [
        updateUser,
        {
            data: updateData,
            error: updateError,
            loading: updateLoading,
            reset: updateReset,
        },
    ] = useMutation<{
        user: User;
    }>(UPDATE_USER, {
        refetchQueries: [
            {
                query: GET_USERS,
            },
            "GetUsers",
        ],
    });
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("49");
    const [telNumber, setTelNumber] = useState("");

    useEffect(() => {
        // Select picked values if any exist
        const fullName = picked?.fullname ?? "";
        const username = picked?.username ?? "";
        let country = "49";
        let number = picked?.number ?? "";
        // Retrieve the country address code and remove it from the number
        if (number && number.startsWith("+")) {
            const pos = number.indexOf(" ");
            const segments = [number.substring(0, pos), number.substring(pos)];
            if (segments.length == 2) {
                country = segments[0].replace("+", "");
                number = segments[1].trim();
            }
        }
        if (picked) {
            reset();
        }
        // Set all values fo the fields
        setFullName(fullName);
        setUsername(username);
        setCountry(country);
        setTelNumber(number);
    }, [picked]);

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const queryOptions = {
                variables: {
                    newUser: {
                        fullname: fullName,
                        username: username,
                        number: `+${country} ${telNumber}`,
                    },
                    username: picked?.username,
                },
            };
            if (picked) {
                await updateUser(queryOptions);
            } else {
                // Add user if the input is valid, which should be ensured by js itself, or the server later.
                await addUser(queryOptions);
            }
        },
        [picked, updateUser, addUser, fullName, username, country, telNumber]
    );

    const handleReset = () => {
        setFullName("");
        setUsername("");
        setCountry("49");
        setTelNumber("");
        updatePicked(undefined);
    };

    useEffect(() => {
        if (!updateData) {
            return;
        }
        updatePicked(updateData.user);
    }, [updatePicked, updateData]);

    return (
        <div>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <fieldset>
                    <legend>{picked ? "Edit User:" : "Create User:"}</legend>
                    <div>
                        <FullNameInput
                            value={fullName}
                            onChange={setFullName}
                        />
                        <UsernameInput
                            value={username}
                            onChange={setUsername}
                        />
                        <CountrySelect value={country} onChange={setCountry} />
                        <NumberInput
                            value={telNumber}
                            onChange={setTelNumber}
                        />
                    </div>
                    <div>
                        <ErrorCaption
                            error={error ?? updateError}
                            loading={loading || updateLoading}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Add User"
                            className="FormItem"
                        />
                        <input type="reset" />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default UserFactory;
