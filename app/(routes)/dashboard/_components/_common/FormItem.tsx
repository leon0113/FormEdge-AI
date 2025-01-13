'use client'
import { EllipsisIcon, Eye, Globe, LockKeyholeIcon, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

type Props = {
    id: number;
    formId: string;
    name: string;
    responses: number;
    views: number;
    createdAt: Date;
    published: boolean;
    backgroundColor: string;
}

const FormItem = ({
    // id,
    formId,
    name,
    published,
    createdAt,
    responses = 0,
    views = 0,
}: Props) => {

    const router = useRouter();

    const onClick = useCallback(() => {
        router.push(`/dashboard/form/builder/${formId}`)
    }, [])

    return (
        <div
            onClick={onClick}
            role='button'
            className='w-full h-auto'
        >
            <div className='w-full relative flex items-center justify-center overflow-hidden h-[150px] rounded-md border border-lime-300 bg-gradient-to-b from-primary/10 to-primary/80'>
                <div className='w-36 absolute bottom-0 flex items-center flex-col px-4 pt-6 h-32 rounded-t-xl bg-slate-50 shadow-lg'>
                    <h5 className='text-sm font-medium mb-1 text-center text-gray-400 truncate block w-[200px]'>{name}</h5>
                </div>
            </div>

            <div className="w-full py-0">
                <div className="flex w-full items-center justify-between py-1">
                    <span className='text-sm flex items-center gap-1 font-medium'>
                        {
                            published ? (
                                <Globe className='text-muted-foreground size-3' />
                            ) : (
                                <LockKeyholeIcon className='text-muted-foreground size-3' />
                            )
                        }
                    </span>
                    <EllipsisIcon className='text-gray-700 size-4' />
                </div>
                <div className="flex w-full border-t border-gray-300 items-center justify-between py-1">
                    <div className='flex items-center gap-2'>
                        <span className='text-muted-foreground flex items-center gap-1'>
                            <span>{responses}</span>
                            <MessageSquare className='text-muted-foreground size-4' />
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='text-muted-foreground flex items-center gap-1'>
                            <span>{views}</span>
                            <Eye className='text-muted-foreground size-4' />
                        </span>
                    </div>
                    <span className='text-muted-foreground flex gap-1 text-sm'>
                        {
                            formatDistanceToNowStrict(createdAt)
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default FormItem