"use client"

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Brain, ChevronsUpDown, NotebookPen, Sparkles, UserRoundPen, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';


function FeedBack({ params }) {

    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();
    useEffect(() => {
        GetFeedback();
    }, []);

    const GetFeedback = async () => {
        try {
            const result = await db
                .select()
                .from(UserAnswer)
                .where(eq(UserAnswer.mockIdRef, params.interviewId))
                .orderBy(UserAnswer.id);

            console.log(result);
            setFeedbackList(result);// Logs data from the database
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    };

    return (
        <div className='p-10'>

            {feedbackList?.length == 0 ?
                <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>
                :
                <>


                    <h2 className='text-3xl font-bold text-green-500'>Hope so it Helped!</h2>
                    <h2 className='font-bold text-2xl'>Here is your feedback</h2>

                    <h2 className='text-primary text-lg my-3'>More possible solutions :</h2>
                    <h2 className='text-sm text-gray-500'>Find below possible cauuse with recommended action, Your feedback as well as more solutions</h2>
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='mt-7'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg
                    my-2 text-left flex justify-between gap-7 w-full'>
                                {item.question}<ChevronsUpDown className='h-5 w-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-green-500 p-2 flex gap-2 border rounded-lg'>
                                        <Sparkles />
                                        <strong>Number of Days required to treat it and get well:</strong>{item.recovery_period}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-yellow-500'><UserRoundPen /><strong>Your Take: </strong>{item.userAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900 '><Brain /><strong>AI's Take: </strong>{item.correctAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'>
                                        <NotebookPen />
                                        <strong>Feedback based on your Insights given to AI:</strong>
                                        {item.feedback.split('\n').map((line, idx) => (
                                            <p key={idx} className="mt-1">{line}</p> // No <ul> to avoid extra bullets
                                        ))}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                            <Separator className="my-5" />
                        </Collapsible>


                    ))}

                </>

            }


            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    );
}

export default FeedBack;
