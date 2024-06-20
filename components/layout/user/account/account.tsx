import React from "react";

import { FaPencil, FaHouse } from "react-icons/fa6";

import AccountContainerItem from "./account-container-item";
import AccountItem from "./account-item";

const Account = () => {
    return (
        <div className="flex flex-col">
            <AccountContainerItem title={"Account"}>
                <AccountItem
                    link="edit-profile"
                    icon={<FaPencil className="text-zinc-400" size={15} />}
                    itemTitle={"Edit Profile"}
                ></AccountItem>
                <AccountItem link="address" icon={<FaHouse className="text-zinc-400" size={15} />} itemTitle={"Address"}></AccountItem>
            </AccountContainerItem>
            <AccountContainerItem title={"Security and Privacy"}>
                <AccountItem
                    link="two-step-auth"
                    icon={<FaHouse className="text-zinc-400" size={15} />}
                    itemTitle={"2-Step verification"}
                ></AccountItem>
                <AccountItem
                    link="close-account"
                    icon={<FaHouse className="text-zinc-400" size={15} />}
                    itemTitle={"Close Account"}
                ></AccountItem>
            </AccountContainerItem>
        </div>
    );
};

export default Account;
