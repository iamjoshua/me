import Nav from "../nav";

export default function OnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      {children}
      <Nav fixed={true} />
    </div>
  );
}
