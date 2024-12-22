import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex justify-center items-start h-screen flex-col w-fit mx-auto gap-5">
      <Image src="/logo.svg" alt="Web SQL logo" width={80} height={80} priority />
      <h1 className="text-4xl font-semibold inline">
        Web SQL client <strong className="underline decoration-blue-600">Coming soon</strong>
      </h1>
      <a
        href="https://github.com/sam-621/websql.dev"
        target="_blank"
        className="flex items-center gap-2 bg-[#FAFAFA] text-[#18181B] p-2 rounded-full w-24 hover:w-32 transition-all overflow-hidden"
      >
        <Image src="/github.svg" alt="Github logo" width={20} height={20} priority />
        Github
        <Image src="/goto.svg" alt="External link" width={20} height={20} className="ml-2" />
      </a>
    </div>
  );
}
