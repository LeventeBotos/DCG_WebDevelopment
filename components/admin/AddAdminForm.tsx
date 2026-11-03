"use client";

import { useActionState } from "react";
import { addAdminAction, type ActionState } from "@/app/admin/(panel)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export default function AddAdminForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(addAdminAction, {});
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <div className="space-y-2">
        <Label htmlFor="admin-email">Google account email</Label>
        <Input id="admin-email" name="email" type="email" required placeholder="name@gmail.com" className="w-72" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="admin-role">Role</Label>
        <Select id="admin-role" name="role" defaultValue="editor" className="w-36">
          <option value="editor">Editor</option>
          <option value="owner">Owner</option>
        </Select>
      </div>
      <Button type="submit" variant="primary" showArrow={false} disabled={pending}>
        {pending ? "Adding…" : "Add admin"}
      </Button>
      <p role="status" aria-live="polite" className={`basis-full text-sm ${state.error ? "text-destructive" : "text-muted-foreground"}`}>
        {state.error ?? state.ok}
      </p>
    </form>
  );
}
