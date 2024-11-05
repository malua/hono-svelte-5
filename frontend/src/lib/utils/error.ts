import { toast } from "svelte-sonner";

export function toastResponseError(data: any) {
    if (data.error?.issues?.length) {
        for (const issue of data.error.issues) {
            toast.error(issue.message);
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
