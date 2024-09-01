import { Alert } from "@material-tailwind/react";

export default function CustomAlert({ message }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Alert color="green">{message}</Alert>
      {/* <Alert color="blue">An info alert for showing message.</Alert>
      <Alert color="red">An error alert for showing message.</Alert> 

      <Alert color="amber">A warning alert for showing message.</Alert>*/}
    </div>
  );
}
