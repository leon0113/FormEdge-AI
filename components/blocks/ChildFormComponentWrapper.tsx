import { FormBlocks } from "@/lib/form-blocks";
import { FormBlockInstance, HandleBlurFunc } from "@/types";
import React from "react";

const ChildFormComponentWrapper = ({
    blockInstance,
    errorMessage,
    isError,
    handleBlur,
}: {
    blockInstance: FormBlockInstance;
    isError?: boolean;
    errorMessage?: string;
    handleBlur?: HandleBlurFunc;
}) => {

    const FormComponent = FormBlocks[blockInstance.blockType]?.formComponent;
    if (!FormComponent) return null;

    return <FormComponent
        blockInstance={blockInstance}
        isError={isError}
        errorMessage={errorMessage}
        handleBlur={handleBlur}
    />;
};

export default ChildFormComponentWrapper;
