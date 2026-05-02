import { Receipt } from "../models/Receipt.js";

export const generateBillNo = async (intent) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const count = await Receipt.countDocuments({
        billNo: new RegExp(`${intent}${year}${month}`)
    });

    const next = String(count + 1).padStart(4, "0");

    return `${intent}${year}${month}${next}`;
};