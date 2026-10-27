import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitForm, type FormInput } from "@/lib/forms.functions";

type Status = "idle" | "loading" | "success" | "error";

export function useFormSubmit() {
  const fn = useServerFn(submitForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const key = useRef<string>("");
  const busy = useRef(false);

  async function submit(input: FormInput extends infer T ? (T extends unknown ? Omit<T, "submissionKey"> : never) : never) {
    if (busy.current) return false;
    busy.current = true;
    if (!key.current) key.current = crypto.randomUUID();
    setStatus("loading"); setError("");
    try {
      await fn({ data: { ...input, submissionKey: key.current } as FormInput });
      setStatus("success");
      key.current = "";
      return true;
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      return false;
    } finally {
      busy.current = false;
    }
  }
  return { submit, status, error, loading: status === "loading" };
}
