"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfileTabProps {
  session: {
    user?: {
      name?: string;
    };
  } | null;
}

export default function ProfileTab({ session }: ProfileTabProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      const [first, ...rest] = session.user.name.split(" ");
      setFirstName(first || "");
      setLastName(rest.join(" ") || "");
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit logic goes here (e.g., POST to API)
    console.log({
      firstName,
      lastName,
      headline,
      bio,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label className="mb-2">First Name</Label>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-2">Last Name</Label>
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label className="mb-2">Headline</Label>
        <Input
          placeholder='Headline (e.g., "Instructor at Loksewa")'
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          maxLength={60}
        />
        <p className="mt-1 text-xs text-gray-500">Add a little headline</p>
      </div>

      <div>
        <Label className="mb-2">Biography</Label>
        <Textarea
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
        <p className="mt-1 text-xs text-gray-500">
          Links and coupon codes are not permitted in this section.
        </p>
      </div>

      <div>
        <Button
          type="submit"
          className="cursor-pointer bg-purple-600 hover:bg-purple-700"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
