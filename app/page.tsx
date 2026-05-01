import { Stage } from "@/components/Stage";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 bg-zinc-900">
      <Stage stageName="Outskirts" characterName="Toxic" pose="swing" action="swing" />
    </div>
  );
}
