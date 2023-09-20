import Nav from "../nav";

export default function OnLayout({ children }) {
  return (
    <div className="">
      {children}
      <Nav fixed={true}  />
    </div>
  );
}
