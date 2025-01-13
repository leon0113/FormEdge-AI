import { FormBlocks } from '@/lib/form-blocks'
import { FormBlockInstance } from '@/types'
import React from 'react'

const ChildCanvasComponentWrapper = ({ blockInstance }: { blockInstance: FormBlockInstance }) => {

    const CanvasComponent = FormBlocks[blockInstance.blockType]?.canvasComponent;
    if (!CanvasComponent) return null;

    return (
        <CanvasComponent blockInstance={blockInstance} />
    )
}

export default ChildCanvasComponentWrapper