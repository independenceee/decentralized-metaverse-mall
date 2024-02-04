"use client";

import { useParams } from "next/navigation";

type Props = {};

function Edit({}: Props) {
    const router: { id: string } = useParams();

    return (
        <div>
            <h3>Edit Voucher</h3>
        </div>
    );
}

export default Edit;
