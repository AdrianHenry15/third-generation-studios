import { useEffect, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUploadFormStore } from "@/stores/upload-form-store";
import { useUploadValidation } from "./use-upload-validation";

export const useUploadForm = (onSubmit: Function) => {
    // Always call hooks at the top level
    const { tracks = [], albumData = {}, remixData = {}, trackCreditData = {}, reset } = useUploadFormStore();

    // Always call validation hook at top level, with safe defaults
    const { validate } = useUploadValidation();
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const mutation = useMutation({
        mutationFn: async () => {
            const errs = validate();
            if (errs.length) {
                setErrors(errs);
                throw new Error("Validation failed");
            }
            return onSubmit({ tracks, remixData, trackCreditData, albumData });
        },
        onSuccess: () => {
            reset();
            setShowConfirm(false);
            setAttemptedSubmit(false);
            setErrors([]);
        },
    });

    // Only show/update validation errors after the user has attempted to submit
    useEffect(() => {
        if (!attemptedSubmit) return;
        const errs = validate();
        setErrors(errs);
    }, [attemptedSubmit, tracks, albumData, remixData, trackCreditData, validate]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            setAttemptedSubmit(true);
            const errs = validate();
            if (errs.length) return setErrors(errs);
            setShowConfirm(true);
            mutation.mutate();
        },
        [validate, mutation],
    );

    return {
        showConfirm,
        setShowConfirm,
        errors,
        isUploading: mutation.isPending,
        handleSubmit,
        confirmUpload: mutation.mutate,
    };
};
