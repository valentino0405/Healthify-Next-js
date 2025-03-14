"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect ,useState} from 'react';

function StartInterview({params}) {

    const[interviewData,setInterviewData]=useState();
    const[mockInterviewQuestion,setMockInterviewQuestion]=useState();

    useEffect(()=>{
            GetInterviewDetails();
    },[]);

      /* Used to Get Interview details by mock nterview id*/
    
      const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId))
    
        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      }

  return (
    <div>
      Start Interview
    </div>
  );
}

export default StartInterview;
