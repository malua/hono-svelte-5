import { toast } from "svelte-sonner";

export function toastResponseError(data: any) {
    if (data.error?.issues?.length) {
        const issues = data.error.issues;
        for (let i = 0; i < issues.length; i++) {
            setTimeout(() => {
                toast.error(issues[i].message);
            }, i * 500);
        }
        return;
    }

    if (data.error.message) {
        toast.error(data.error.message);
        return;
    }

    if (typeof data.error === "string") {
        toast.error(data.error);
        return;
    }
    toast.error("An error occurred");
}
