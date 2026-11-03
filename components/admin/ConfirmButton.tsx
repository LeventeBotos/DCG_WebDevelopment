"use client";

import { useId, useRef, type ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * A button that asks for confirmation (native <dialog>: focus-trapped, Esc to cancel) before submitting the
 * surrounding <form>. Drop it inside any server-action form in place of the submit button.
 */
export default function ConfirmButton({
  children,
  title,
  description,
  confirmLabel = "Delete",
  variant = "ghost",
  size = "sm",
  className,
  destructive = true,
}: {
  children: ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  destructive?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant={variant}
        size={size}
        showArrow={false}
        className={className}
        onClick={() => dialogRef.current?.showModal()}
      >
        {children}
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="w-[min(92vw,26rem)] rounded-xl border bg-background p-6 text-foreground shadow-xl backdrop:bg-black/50"
      >
        <h2 id={titleId} className="text-base font-semibold">
          {title}
        </h2>
        {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" showArrow={false} autoFocus onClick={() => dialogRef.current?.close()}>
            Cancel
          </Button>
          <Button
            type="button"
            variant={destructive ? "destructive" : "primary"}
            size="sm"
            showArrow={false}
            onClick={() => {
              dialogRef.current?.close();
              triggerRef.current?.closest("form")?.requestSubmit();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </dialog>
    </>
  );
}
