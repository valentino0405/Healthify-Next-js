"use client"

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment/moment';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { db } from "@/utils/db";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt =
            `Health Problem: ${jobPosition}, 
Description: ${jobDesc}, 
Days Experiencing: ${jobExperience}. 
Based on this information, please generate ${process.env.NEXT_PUBLIC_HEALTH_SOLUTION_COUNT} solutions in JSON format. 
The JSON should have a "Possible Cause" field explaining potential reasons for the issue 
and a "Recommended Action" field suggesting steps for relief or further medical consultation.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            let responseText = await result.response.text();
            console.log("Raw Response:", responseText);
            responseText = responseText.replace(/```json/, "").replace(/```/, "").trim();
            const parsedResponse = JSON.parse(responseText);
            console.log("Parsed JSON Response:", parsedResponse);
            setJsonResponse(parsedResponse);

            if (parsedResponse) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: parsedResponse,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-yyyy')
                    }).returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID:", resp);

                if (resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + resp[0]?.mockId);
                }
            } else {
                console.error("Parsed response was empty");
            }
        } catch (error) {
            console.error("Error processing request:", error);
            // Optionally, display an error message to the user
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary
            hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='font-bold text-lg text-center'>+Add New</h2>

            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>

                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='font-bold text-2xl'>Tell us more about your Health Problem</DialogTitle>


                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>

                                    <h2>Add details about your Health Problem,a small description and number of Days your are suffering from it</h2>

                                    <div className='mt-7 my-3'>
                                        <label>Health Problem(Title)</label>
                                        <Input placeholder="Ex. Headache,Stomachpain,Rashes,Fever" required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />

                                    </div>
                                    <div className='my-3'>
                                        <label>Health Problem Description (In short)</label>
                                        <Textarea placeholder="Ex. Getting frequent headaches,nausea etc" max="100" required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />

                                    </div>
                                    <div className='my-3'>
                                        <label>Number of Days you are experiencing it from</label>
                                        <Input placeholder="Ex. 5" required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />

                                    </div>


                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit"
                                        disabled={loading}
                                    >{
                                            loading ?
                                                <>
                                                    <LoaderCircle className='animate-spin' />'Generating from AI'
                                                </> : 'Give Solution'
                                        }


                                    </Button>
                                </div>

                            </form>

                        </DialogDescription>


                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default AddNewInterview;