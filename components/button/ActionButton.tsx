import { Button } from "flowbite-react";

interface Props {
  btnColor: string;
  btnText: string;
  onClick?: () => void;
}

const ActionButton = ({ btnColor, btnText, onClick }: Props) => {
  return (
    <Button color={btnColor} onClick={onClick}>
      {btnText}
    </Button>
  );
};

export default ActionButton;
