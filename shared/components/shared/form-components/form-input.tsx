import { cn } from "@/shared/lib/utils";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "../../ui";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, className, ...props }) => {
  // const {} = useFormContext();

  return (
    <div className={cn(className)}>
      {label && (
        <p className='font-medium mb-2'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input className='h-12 text-md' {...props} />

        <ClearButton />
      </div>

      <ErrorText text='Поле обязательно для заполнения' />
    </div>
  );
};
