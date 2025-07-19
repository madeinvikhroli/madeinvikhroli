'use client';
export default function Page() {
    return (
    <div className="w-full font-[var(--font-modi)] flex flex-col items-center gap-2 mt-16">
        {Array.from({ length: 100 }).map((_, index) => 
            index === 50 ? (<p key={index} className="text-[64px] font-semibold">आम्ही <a href="" target="_blank" className="">विक्रोळीतील</a> एक कला समुह आहोत</p>) : 
            (<p key={index} className="text-[64px] font-semibold">𑘁𑘦𑘿𑘮𑘲 <a href="" target="_blank" className="">𑘪𑘲𑘎𑘿𑘨𑘻𑘯𑘲𑘝𑘲𑘩</a> 𑘊𑘎 𑘎𑘩𑘰 𑘭𑘦𑘳𑘮 𑘁𑘮𑘻𑘝.</p>)
        )}
        
    </div>
);
}